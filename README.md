# hellofuture-hashthruster
repository for hello future hackathon


HASHTHRUSTER BACKEND

1 - Replace .env-example file with .env and fill environment variables with the required values
2 - Installation: yarn install
3 - Start: npm run dev

HASHTHRUSTER ADMIN

1 - Replace .env-example file with .env and fill environment variables with the required values
2 - Installation: yarn install
3 - Start: npm run dev

If you want to connect on Admin, you can use my fake account

email: blabla@gmail.com
password: Azerty1234!

After you can create an admin in the Profile page on valid email address.
It will send you an email with temporary password and you need to validate status for new admin (if you don't validate you can't access with your new account)
After that, with you want to change password, you can log in and change password with your new Password.

HASHTHRUSTER FRONTEND

Requirement for transaction => Hashpack Wallet

1 - Replace .env-example file with .env and fill environment variables with the required values
2 - Installation: yarn install
3 - Start: npm run dev

HASHTHRUSTER NLP

ATTENTION to be able to use the model, the weights need to be unziped (W_Glove_finetune_twitter_small)

To be able to try out AI, you need to have a python environment with conda installed on your machine.

1 - Create environnement: conda create -n hashthruster-project python=3.8

2 - Activate environnement: conda activate hashthruster-project

3 - Install libraries (only first time): pip install -r requirements.txt

4 - Install all necessaries package (only first time): python ssl_nltk.py

5 - Start: streamlit run streamlit.py

WARNING: For the moment, this model is trained to work with up to 100 words.
If you wish to send a JSON to the template, you can send in this format:

{
    "text_data": "Bobr the beaver beamed with pride as he admired his sleek Vega Missile. His Jackie-Coins project had exceeded all expectations, revolutionizing the forest's economy. Investors were thrilled with their returns, and Bobr was hailed as a visionary. The forest buzzed with excitement about his success. His dream car was now a reality, symbolizing his hard work and innovation. Bobr's confidence soared as he received invitations to speak at woodland conferences. The community looked up to him as an inspiration. He felt fulfilled, knowing he'd created something truly valuable. Excited about future possibilities, Bobr was ready to embark on new, even greater ventures."
}

At the root of the git I've put two screenshots showing the result of the AI analysis.
We have a score of 84% with a very small model.
This puts us in 45th position worldwide on this subject.

see link: https://paperswithcode.com/sota/sentiment-analysis-on-imdb

We need to keep working on it - this is a small Proof of concept.
