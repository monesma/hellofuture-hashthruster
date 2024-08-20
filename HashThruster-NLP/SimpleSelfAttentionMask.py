import tensorflow as tf
from tensorflow.keras import layers


class SimpleSelfAttentionMask(layers.Layer):
    """
    A custom layer implementing a simplified version of self-attention with optional masking.
    
    This layer applies multi-head self-attention to the input, with options for positional
    embeddings and causal masking. It includes residual connections and layer normalization.

    Attributes:
        num_heads (int): Number of attention heads.
        filters (int): Number of filters (dimensionality of the output space).
        dropout_rate (float): Dropout rate for attention weights.
        depth (int): Depth of each attention head.
        use_causal_mask (bool): Whether to use causal masking.
        Wq, Wk, Wv (Dense): Dense layers for query, key, and value projections.
        dense (Dense): Output dense layer.
        dropout (Dropout): Dropout layer.
        layernorm1, layernorm2 (LayerNormalization): Layer normalization layers.
        position_embeddings (Weight): Optional positional embeddings.
    """
    def __init__(self, filters, num_heads, dropout_rate=0.1, kernel_regularizer=None, 
                 bias_regularizer=None, kernel_constraint=None, bias_constraint=None,
                 position_embedding_size=None, use_causal_mask=False, **kwargs):
        """
        Initialize the SimpleSelfAttentionMask layer.

        Args:
            filters (int): Number of filters in the output.
            num_heads (int): Number of attention heads.
            dropout_rate (float, optional): Dropout rate. Defaults to 0.1.
            kernel_regularizer (Regularizer, optional): Regularizer for the kernel weights.
            bias_regularizer (Regularizer, optional): Regularizer for the bias weights.
            kernel_constraint (Constraint, optional): Constraint for the kernel weights.
            bias_constraint (Constraint, optional): Constraint for the bias weights.
            position_embedding_size (int, optional): Size of positional embeddings.
            use_causal_mask (bool, optional): Whether to use causal masking. Defaults to False.
        
        Raises:
            ValueError: If filters is not divisible by num_heads.
        """
        super(SimpleSelfAttentionMask, self).__init__(**kwargs)

        if filters % num_heads != 0:
            raise ValueError(f"Filters ({filters}) must be divisible by num_heads ({num_heads}).")

        self.num_heads = num_heads
        self.filters = filters
        self.dropout_rate = dropout_rate
        self.depth = filters // self.num_heads
        self.use_causal_mask = use_causal_mask

        self.Wq, self.Wk, self.Wv = self._initialize_dense_layers(filters, kernel_regularizer, 
                                                                  bias_regularizer, kernel_constraint, 
                                                                  bias_constraint)

        self.dense = layers.Dense(filters, kernel_regularizer=kernel_regularizer, 
                                  bias_regularizer=bias_regularizer, 
                                  kernel_constraint=kernel_constraint, 
                                  bias_constraint=bias_constraint)

        self.dropout = layers.Dropout(dropout_rate)
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)

        self.position_embeddings = None
        if position_embedding_size is not None:
            self.position_embeddings = self.add_weight(
                shape=(position_embedding_size, self.depth),
                initializer='uniform',
                trainable=True,
                name='position_embeddings'
            )

    def _initialize_dense_layers(self, filters, kernel_regularizer, bias_regularizer, kernel_constraint, bias_constraint):
        """
        Initialize the dense layers for query, key, and value projections.

        Args:
            filters (int): Number of filters for each dense layer.
            kernel_regularizer (Regularizer): Regularizer for the kernel weights.
            bias_regularizer (Regularizer): Regularizer for the bias weights.
            kernel_constraint (Constraint): Constraint for the kernel weights.
            bias_constraint (Constraint): Constraint for the bias weights.

        Returns:
            tuple: Three Dense layers for query, key, and value projections.
        """

        return (
            layers.Dense(filters, kernel_regularizer=kernel_regularizer, 
                         bias_regularizer=bias_regularizer, 
                         kernel_constraint=kernel_constraint, 
                         bias_constraint=bias_constraint),
            layers.Dense(filters, kernel_regularizer=kernel_regularizer, 
                         bias_regularizer=bias_regularizer, 
                         kernel_constraint=kernel_constraint, 
                         bias_constraint=bias_constraint),
            layers.Dense(filters, kernel_regularizer=kernel_regularizer, 
                         bias_regularizer=bias_regularizer, 
                         kernel_constraint=kernel_constraint, 
                         bias_constraint=bias_constraint)
        )

    def split_heads(self, x, batch_size):
        """
        Split the last dimension into (num_heads, depth).
        
        Args:
            x (Tensor): Input tensor.
            batch_size (int): Batch size.

        Returns:
            Tensor: Reshaped tensor with shape (batch_size, num_heads, seq_len, depth).

        Raises:
            TypeError: If input is not a 3-dimensional tensor.
        """
        if not tf.is_tensor(x) or len(x.shape) != 3:
            raise TypeError("Input must be a 3-dimensional tensor")
        
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])

    def scaled_dot_product_attention(self, q, k, v):
        """
        Calculate the attention weights and apply them to the value.

        Args:
            q (Tensor): Query tensor.
            k (Tensor): Key tensor.
            v (Tensor): Value tensor.

        Returns:
            tuple: Output tensor and attention weights.
        """
        if self.position_embeddings is not None:
            position_embeddings = tf.reshape(self.position_embeddings, [1, 1, -1, self.depth])
            k += position_embeddings 
        
        matmul_qk = tf.matmul(q, k, transpose_b=True)
        dk = tf.cast(tf.shape(k)[-1], tf.float32)
        scaled_attention_logits = matmul_qk / tf.math.maximum(tf.math.sqrt(dk), tf.keras.backend.epsilon())

        if self.use_causal_mask:
            seq_len = tf.shape(q)[2]
            mask = 1 - tf.linalg.band_part(tf.ones((seq_len, seq_len)), -1, 0)
            scaled_attention_logits += (mask * -1e9)

        attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)
        attention_weights = self.dropout(attention_weights)

        output = tf.matmul(attention_weights, v)
        return output, attention_weights 
    
    def call(self, x, training=None):
        """
        Call the layer on input x.

        Args:
            x (Tensor): Input tensor of shape (batch_size, seq_len, input_dim).
            training (bool, optional): Whether in training mode. Defaults to None.

        Returns:
            tuple: Output tensor and attention weights.

        Raises:
            ValueError: If input shape is not 3-dimensional.
        """
        if len(x.shape) != 3:
            raise ValueError("Expected input shape: (batch_size, sequence_length, features)")

        batch_size = tf.shape(x)[0]

        x = self.layernorm1(x)  

        q = self.Wq(x)  
        k = self.Wk(x)  
        v = self.Wv(x)  

        q = self.split_heads(q, batch_size)  
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)

        scaled_attention, attention_weights = self.scaled_dot_product_attention(q, k, v)

        # Stack or concatenate attention heads
        scaled_attention = tf.transpose(scaled_attention, perm=[0, 2, 1, 3])  
        concat_attention = tf.reshape(scaled_attention, (batch_size, -1, self.filters))

        attention_output = self.dense(concat_attention)

        attention_output += x  

        output = self.layernorm2(attention_output)

        return output, attention_weights


    def get_config(self):
        """
        Get the config of the layer.

        Returns:
            dict: Configuration of the layer.
        """
        config = super(SimpleSelfAttentionMask, self).get_config()
        config.update({
            'num_heads': self.num_heads,
            'filters': self.filters,
            'dropout_rate': self.dropout_rate,
            'kernel_regularizer': tf.keras.regularizers.serialize(self.Wq.kernel_regularizer),
            'bias_regularizer': tf.keras.regularizers.serialize(self.Wq.bias_regularizer),
            'kernel_constraint': tf.keras.constraints.serialize(self.Wq.kernel_constraint),
            'bias_constraint': tf.keras.constraints.serialize(self.Wq.bias_constraint),
            'position_embedding_size': None if self.position_embeddings is None else self.position_embeddings.shape[0],
            'use_causal_mask': self.use_causal_mask
        })
        return config
