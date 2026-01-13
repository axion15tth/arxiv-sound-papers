import os
from dotenv import load_dotenv

load_dotenv()

# arXiv設定
CATEGORIES = ["cs.SD", "eess.AS", "cs.AI"]
KEYWORDS = ["audio", "speech", "sound", "music", "acoustic"]
DAYS_BACK = 7  # 過去何日分取得するか

# Google Cloud Service Account
# GOOGLE_APPLICATION_CREDENTIALS環境変数でサービスアカウントキーを指定
