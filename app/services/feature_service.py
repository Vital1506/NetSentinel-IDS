import re
import urllib.parse

def extract_features(url):
    parsed = urllib.parse.urlparse(url)

    features = {}

    features["url_length"] = len(url)
    features["num_dots"] = url.count(".")
    features["num_hyphens"] = url.count("-")
    features["num_at"] = url.count("@")
    features["num_question"] = url.count("?")
    features["num_percent"] = url.count("%")
    features["num_equals"] = url.count("=")
    features["num_http"] = url.count("http")
    features["num_https"] = url.count("https")
    features["num_digits"] = sum(c.isdigit() for c in url)
    features["has_ip"] = 1 if re.match(r"\d+\.\d+\.\d+\.\d+", parsed.netloc) else 0
    features["path_length"] = len(parsed.path)
    features["query_length"] = len(parsed.query)

    return list(features.values())