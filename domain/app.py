from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

ZENQUOTES_URL = "https://zenquotes.io/api/random"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/quote")
def get_quote():
    try:
        response = requests.get(ZENQUOTES_URL, timeout=5)
        response.raise_for_status()
        data = response.json()[0]
        return jsonify({"quote": data["q"], "author": data["a"]})
    except requests.RequestException:
        return jsonify({"error": "Could not fetch quote. Please try again."}), 502


if __name__ == "__main__":
    app.run(debug=True)
