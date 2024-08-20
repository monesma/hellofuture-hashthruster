from SimpleSelfAttentionMask import SimpleSelfAttentionMask
import streamlit as st
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras import layers, regularizers, Model
import re 
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import json
import numpy as np
import plotly.graph_objects as go
from collections import defaultdict

from collections import defaultdict
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk


nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

test_text_negative = """
Bobr the beaver slumped dejectedly by the river, badly imagine is future, no home. His Jackie-Coins project had crashed significantly. Investors were furious, demanding refunds he couldn't provide. The forest echoed with angry chatter about his failure. His dream of owning the Vega Missile seemed impossible now. Sleepless nights and stress had taken their toll. He felt like a fraud, questioning every decision he'd made. The once-supportive forest community now avoided him. Bobr's confidence was shattered, his entrepreneurial spirit crushed. He wondered if he'd ever recover from this setback or if his reputation was permanently ruined. The future looked bleak and uncertain.
"""

test_text_positive = """
Bobr the beaver beamed with pride as he admired his sleek Vega Missile. His Jackie-Coins project had exceeded all expectations, revolutionizing the forest's economy. Investors were thrilled with their returns, and Bobr was hailed as a visionary. The forest buzzed with excitement about his success. His dream car was now a reality, symbolizing his hard work and innovation. Bobr's confidence soared as he received invitations to speak at woodland conferences. The community looked up to him as an inspiration. He felt fulfilled, knowing he'd created something truly valuable. Excited about future possibilities, Bobr was ready to embark on new, even greater ventures.
"""


def clean_text(text):
    """
    Clean and tokenize the input text.

    This function performs the following operations:
    1. Converts the text to lowercase
    2. Removes all non-alphanumeric characters
    3. Tokenizes the text
    4. Removes stop words

    Args:
        text (str): The input text to be cleaned.

    Returns:
        list: A list of cleaned and tokenized words.
    """
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    return tokens


def preprocess_text(text, tokenizer, max_length):
    """
    Preprocess the input text for model input.

    This function tokenizes the text, pads or truncates the sequence to a fixed length,
    and converts the tokens back to words.

    Args:
        text (str): The input text to be preprocessed.
        tokenizer (Tokenizer): The tokenizer object used for text tokenization.
        max_length (int): The maximum length of the padded sequence.

    Returns:
        tuple: A tuple containing:
            - padded_tokens (ndarray): The padded sequence of token indices.
            - word_tokens (list): The list of words corresponding to non-zero tokens.
    """
    tokens = tokenizer.texts_to_sequences([text])[0]
    padded_tokens = pad_sequences([tokens], maxlen=max_length, padding='post', truncating='post')[0]
    word_tokens = [tokenizer.index_word.get(token, '') for token in padded_tokens if token != 0]
    return padded_tokens, word_tokens


def get_relevant_words(tokens, attention_weights, top_n=20):
    """
    Extract the most relevant words based on attention weights.

    This function processes the tokens, removes stop words, applies lemmatization,
    and calculates the average attention weight for each word.

    Args:
        tokens (list): List of input tokens.
        attention_weights (ndarray): Array of attention weights corresponding to the tokens.
        top_n (int, optional): Number of top relevant words to return. Defaults to 20.

    Returns:
        tuple: A tuple containing:
            - relevant_tokens (list): List of the top_n most relevant tokens.
            - relevant_weights (list): Corresponding weights of the relevant tokens.
    """
    attention_weights = attention_weights[:len(tokens)]
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    processed_tokens = [lemmatizer.lemmatize(token.lower()) for token in tokens if token.lower() not in stop_words]
    word_weights = defaultdict(float)
    word_counts = defaultdict(int)
    
    for token, weight in zip(processed_tokens, attention_weights):
        word_weights[token] += weight
        word_counts[token] += 1
    
    avg_word_weights = {word: total_weight / word_counts[word] 
                        for word, total_weight in word_weights.items()}

    sorted_words = sorted(avg_word_weights.items(), key=lambda x: x[1], reverse=True)
    relevant_tokens, relevant_weights = zip(*sorted_words[:top_n])
    return list(relevant_tokens), list(relevant_weights)


def create_plotly_wordcloud(relevant_tokens, relevant_weights, top_n=40):
    """
    Create a word cloud visualization using Plotly.

    This function generates a scatter plot that resembles a word cloud,
    where word size and opacity are proportional to their relevance.

    Args:
        relevant_tokens (list): List of relevant tokens.
        relevant_weights (list): Corresponding weights of the relevant tokens.
        top_n (int, optional): Number of top words to include in the cloud. Defaults to 40.

    Returns:
        go.Figure: A Plotly figure object representing the word cloud.
    """
    tokens = relevant_tokens[:top_n]
    weights = relevant_weights[:top_n]
    
    max_weight = max(weights)
    min_weight = min(weights)
    sizes = [15 + 35 * ((w - min_weight) / (max_weight - min_weight)) for w in weights]
    opacities = [0.5 + 0.5 * ((w - min_weight) / (max_weight - min_weight)) for w in weights]
    
    def spiral(t):
        a = 1
        b = 0.2
        return (a + b * t) * np.cos(t), (a + b * t) * np.sin(t)

    t = np.linspace(0, 20*np.pi, len(tokens))
    x, y = spiral(t)
    x = (x - min(x)) / (max(x) - min(x))
    y = (y - min(y)) / (max(y) - min(y))
    
    trace = go.Scatter(
        x=x, 
        y=y,
        mode='text',
        text=tokens,
        hoverinfo='text',
        hovertext=[f"{token}: {weight:.4f}" for token, weight in zip(tokens, weights)],
        textfont={
            'size': sizes,
            'color': [f'rgba(138, 84, 236, {opacity})' for opacity in opacities]
        }
    )

    layout = go.Layout(
        xaxis={'showgrid': False, 'showticklabels': False, 'zeroline': False, 'range': [-0.05, 1.05]},
        yaxis={'showgrid': False, 'showticklabels': False, 'zeroline': False, 'range': [-0.05, 1.05]},
        hovermode='closest',
        margin=dict(l=0, r=0, t=0, b=0),
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        width=800,
        height=800,
    )
    
    fig = go.Figure(data=[trace], layout=layout)
    
    return fig



class Ares(Model):
    """
    Ares model for text classification with attention mechanism.

    This model incorporates an embedding layer, a custom self-attention layer,
    and dense layers for text classification tasks.

    Attributes:
        params (dict): Dictionary containing model parameters.
        embedding (Embedding): Word embedding layer.
        attention (SimpleSelfAttentionMask): Custom self-attention layer.
        global_avg_pooling (GlobalAveragePooling1D): Global average pooling layer.
        embedding_projection (Dense): Dense layer for embedding projection.
        output_layer (Dense): Output dense layer for classification.
        include_classifier (bool): Whether to include the classifier in the output.
    """
    def __init__(self, params):
        """
        Initialize the Ares model.

        Args:
            params (dict): Dictionary containing model parameters including:
                - vocab_size (int): Size of the vocabulary.
                - embedding_dim (int): Dimension of the embedding vectors.
                - max_length (int): Maximum length of input sequences.
                - embedding_matrix (ndarray): Pre-trained embedding matrix.
                - filters (int): Number of filters in the attention layer.
                - num_heads (int): Number of attention heads (default: 5).
                - attention_dropout (float): Dropout rate for attention (default: 0.5).
                - l2_rate (float): L2 regularization rate (default: 0.0001).
                - num_classes (int): Number of output classes.
                - include_classifier (bool): Whether to include classifier (default: False).
                - trainable_embedding (bool): Whether embedding is trainable (default: True).
        """
        super(Ares, self).__init__()
        
        self.params = params
        
        self.embedding = layers.Embedding(
            input_dim=params['vocab_size'], 
            output_dim=params['embedding_dim'], 
            input_length=params['max_length'],
            weights=[params['embedding_matrix']],
            trainable=params.get('trainable_embedding', True),
            name="embedding_layer"
        )
        
        self.attention = SimpleSelfAttentionMask(
            filters=params['filters'], 
            num_heads=params.get('num_heads', 5), 
            dropout_rate=params.get('attention_dropout', 0.5), 
            name="attention_layer",
            kernel_regularizer=regularizers.l2(params.get('l2_rate', 0.0001))
        )
        
        self.global_avg_pooling = layers.GlobalAveragePooling1D(
            name="global_average_pooling"
        )

        self.embedding_projection = layers.Dense(
            params['filters'],
            kernel_regularizer=regularizers.l2(params.get('l2_rate', 0.0001)),
            name="embedding_projection"
        )

        self.output_layer = layers.Dense(
            params['num_classes'], 
            activation='sigmoid',
            kernel_regularizer=regularizers.l2(params.get('l2_rate', 0.0001)),
            name="output_layer"
        )

        self.include_classifier = params.get('include_classifier', False)

    def call(self, inputs, training=None, return_attention_scores=True):
        """
        Call the model on input data.

        Args:
            inputs (Tensor): Input tensor of shape (batch_size, sequence_length).
            training (bool, optional): Whether in training mode. Defaults to None.
            return_attention_scores (bool, optional): Whether to return attention scores. Defaults to True.

        Returns:
            tuple or Tensor: If return_attention_scores is True, returns a tuple of (output, attention_weights).
                             Otherwise, returns the output tensor.
        """
        embedded = self.embedding(inputs)
        attention_output, attention_weights = self.attention(embedded, training=training)
        
        pooled_attention = self.global_avg_pooling(attention_output)
        pooled_embedding = self.global_avg_pooling(embedded)
        
        pooled_embedding = self.embedding_projection(pooled_embedding)
        
        combined = pooled_attention + pooled_embedding
        
        if return_attention_scores:
            return self.output_layer(combined), attention_weights
        else:
            return self.output_layer(combined) if self.include_classifier else combined
    
    @staticmethod
    def save_weights_to_json(model, filepath):
        """
        Save model weights to a JSON file.

        Args:
            model (Ares): The Ares model instance.
            filepath (str): Path to save the JSON file.
        """
        weights = model.get_weights()
        weights_list = [w.tolist() for w in weights]
        with open(filepath, 'w') as f:
            json.dump(weights_list, f)

    @staticmethod
    def load_weights_from_json(model, filepath, include_classifier=True):
        """
        Load model weights from a JSON file.

        Args:
            model (Ares): The Ares model instance.
            filepath (str): Path to the JSON file containing weights.
            include_classifier (bool, optional): Whether to include classifier weights. Defaults to True.

        Returns:
            Ares: The model with loaded weights.
        """
        with open(filepath, 'r') as f:
            weights_list = json.load(f)
        weights = [tf.convert_to_tensor(w) for w in weights_list]
        if not include_classifier:
            model_weights_count = len(model.get_weights())
            weights = weights[:model_weights_count]
        model.set_weights(weights)
        return model


st.set_page_config(layout="wide")

custom_css = """
<style>
    /* Set the background gradient */
    .stApp {
        background: linear-gradient(#131313, #282828);
        background-position: center;
        background-size: cover;
        color: #ffffff;
    }

    /* Style the titles and text */
    .stApp h1, .stApp h2, .stApp h3, .stApp p {
        color: #ffffff;
        font-size: 1.2em;
    }

    /* Style buttons */
    .stButton button {
        background-color: #6c63ff;
        color: #ffffff;
        border-radius: 10px;
        border: 1px solid #6c63ff;
        font-size: 1.1em; 
    }

    .stButton button:hover {
        background-color: #ffffff;
        color: #6c63ff;
        border: 1px solid #6c63ff;
    }

    /* Style info boxes */
    .stAlert {
        background-color: #8a54ec;
        color: #ffffff;
        border-radius: 10px;
        font-size: 1.1em;
    }

    /* Set the cleaned text color to black */
    .cleaned-text p {
        color: #ffffff;
        font-size: 1.2em;
    }

    .stPlotlyChart > div {
    background-color: black !important;
    }
</style>
"""

st.markdown(custom_css, unsafe_allow_html=True)

def main():
    st.title("Text Emotion Analyzer")

    st.info("""
    This model is a fine-tuned version of a sentiment analysis model originally trained on [Twitter data](https://twitter.com). 
    It has been adapted to analyze the sentiment of short text passages while retaining its ability to 
    capture nuanced expressions of sentiment.
    """)

    col1, col2 = st.columns([0.4, 0.6])

    with col1:
        st.markdown("<br>", unsafe_allow_html=True)
        data_choice = st.selectbox("Choose example", ["test_text_negative", "test_text_positive", "Upload JSON"])

    with col2:
        st.markdown("<br>", unsafe_allow_html=True)

        if data_choice == "test_text_negative":
            selected_text = test_text_negative
        elif data_choice == "test_text_positive":
            selected_text = test_text_positive
        else:
            uploaded_file = st.file_uploader("Upload JSON file", type=["json"])
            if uploaded_file:
                json_data = json.load(uploaded_file)
                if "text_data" in json_data:
                    selected_text = json_data["text_data"]
                else:
                    st.error("JSON file must contain a 'text_data' field.")
                    return
            else:
                st.warning("Please upload a JSON file.")
                return

        st.write("Original Text:")
        st.write(selected_text)

    st.write("Cleaned Text:")
    st.markdown("<br>", unsafe_allow_html=True)
    with st.container():
        st.markdown("<div class='cleaned-text'><p>{}</p></div>".format(" ".join(clean_text(selected_text))), unsafe_allow_html=True)
    
    vocab_size = 5000
    embedding_dim = 300
    embedding_matrix = np.zeros((vocab_size, embedding_dim))
    params = {
        'vocab_size': 5000,
        'embedding_dim': 300,
        'max_length': 100,
        'embedding_matrix': embedding_matrix,
        'num_classes': 1,
        'filters': 300,
        'num_heads': 5,
        'attention_dropout': 0.5,
        'l2_rate': 0.0001,
        'include_classifier': True,
        'trainable_embedding': True
    }
    adam_optimizer = tf.keras.optimizers.Adam(learning_rate=1e-4)
    model = Ares(params)
    model.compile(optimizer=adam_optimizer, loss='binary_crossentropy', metrics=['accuracy'])
    dummy_input = tf.zeros((1, params['max_length']), dtype=tf.int32)
    _, attn = model(dummy_input) 
    Ares.load_weights_from_json(model, 'W_Glove_finetune_twitter_small.json', True)

    tokenizer = Tokenizer(num_words=params['vocab_size'], oov_token="<OOV>")
    tokenizer.fit_on_texts([selected_text])
    padded_tokens, word_tokens = preprocess_text(selected_text, tokenizer, params['max_length'])
    predictions, attn_w = model.predict(np.expand_dims(padded_tokens, axis=0))
    predicted_class = (predictions > 0.5).astype("int32")

    if predicted_class == 1:
        st.write("The model predicts a positive sentiment or class for the text.")
    else:
        st.write("The model predicts a negative sentiment or class for the text.")
    
    mean_attention_weights = np.mean(attn_w, axis=(1, 2)).flatten()
    mean_attention_weights = mean_attention_weights[:len(word_tokens)]
    relevant_tokens, relevant_weights = get_relevant_words(word_tokens, mean_attention_weights)

    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=relevant_tokens,
        y=relevant_weights,
        marker=dict(color='#8a54ec'),
    ))
    fig.update_layout(
        title='Attention Weights for Most Relevant Words in the Text',
        title_font=dict(size=24, color='#8a54ec'),
        xaxis_title='Words',
        yaxis_title='Attention Weight',
        template='plotly_white',
        xaxis_tickangle=-45,
        height=700,
        width=2000,
        plot_bgcolor='#131313',
        paper_bgcolor='#131313',
        font=dict(color='#ffffff'),
    )
    st.plotly_chart(fig)

    st.subheader("Interactive Word Cloud of Most Relevant Words")
    fig = create_plotly_wordcloud(relevant_tokens, relevant_weights)
    st.plotly_chart(fig, use_container_width=True)

if __name__ == "__main__":
    main()