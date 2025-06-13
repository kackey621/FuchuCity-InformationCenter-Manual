# カウンターの初期化
COUNTER=1

# 指定したディレクトリ内の全てのPNGファイルに対してループ
for FILE in *.png; do
  # 新しいファイル名をフォーマット（例: img001.png, img002.png）
  NEWFILE=$(printf "%d.png" "$COUNTER")
  
  # ファイルをリネーム
  mv "$FILE" "$NEWFILE"

  # カウンターをインクリメント
  let COUNTER=COUNTER+1
done

echo "リネーム完了"
