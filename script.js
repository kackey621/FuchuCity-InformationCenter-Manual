// script.js
// 画像グループの定義（photosフォルダー配下を参照）
const imageNumbers = [15,13,5,7,7,4,4,1];
const imageFolderName = ["A","B","C","D","E","F","G","H"];
const imageGroups = [[]];
// [
//   [
//     "photos/group0-1.jpg",
//     "photos/group0-2.jpg",
//     "photos/group0-3.jpg"
//   ],
//   [
//     "photos/group1-1.jpg",
//     "photos/group1-2.jpg"
//   ]
//   // 必要に応じて追加
// ];

for (let i = 0; i < imageFolderName.length; i++) {
  const group = [];
  // 各フォルダの画像数に応じてパスを生成
  // 例: photos/A/1.png, photos/A/2.png, ...
  for (let j = 1; j <= imageNumbers[i]; j++) {
    group.push(`photos/${imageFolderName[i]}/${j}.png`);
  }
  imageGroups.push(group);
}
imageGroups.shift(); // 最初の空配列を削除
console.log(imageGroups); // デバッグ用

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup-overlay');
  const carouselTrack = document.querySelector('.carousel-track');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentImages = [];
  let currentIndex = 0;

  // ボタンにイベント設定
  document.querySelectorAll('.btn-on-image').forEach(btn => {
    btn.addEventListener('click', () => {
      const groupIdx = Number(btn.dataset.group);
      currentImages = imageGroups[groupIdx];
      currentIndex = 0;
      showCarousel();
      popup.style.display = 'block';
      document.body.style.overflow = 'hidden'; // 背景スクロール防止
    });
  });

  function showCarousel() {
    carouselTrack.innerHTML = '';
    currentImages.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `カルーセル画像${idx+1}`;
      if (idx === currentIndex) img.classList.add('active');
      carouselTrack.appendChild(img);
    });
  }

  function updateActive() {
    carouselTrack.querySelectorAll('img').forEach((img, idx) => {
      img.classList.toggle('active', idx === currentIndex);
    });
  }

  function navigate(direction) {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
    updateActive();
  }

  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  function closePopup() {
    popup.style.display = 'none';
    carouselTrack.innerHTML = '';
    document.body.style.overflow = ''; // スクロール復帰
  }

  // タッチスワイプ対応
  let touchStartX = 0;
  carouselTrack.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
    }
  });
  carouselTrack.addEventListener('touchend', e => {
    if (!currentImages.length) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (Math.abs(diffX) > 50) {
      navigate(diffX > 0 ? 1 : -1);
    }
  });

  // キーボード操作対応
  document.addEventListener('keydown', (e) => {
    if (popup.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === 'Escape') {
        closePopup();
      }
    }
  });

  // ウィンドウリサイズ時の画像幅調整（object-fitで基本対応済み）
  window.addEventListener('resize', () => {
    // 必要ならここで追加処理
  });
});
