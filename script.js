// 年別データの定義
// 新しい年を追加する場合は、このyearsDataに新しいオブジェクトを追加してください
const yearsData = [
    {
        year: 2024,
        description: '2024年のプロジェクトアーカイブ',
        stats: {
            posts: '準備中',
            likes: '準備中',
            retweets: '準備中'
        },
        link: './2024/index.html'
    },
    {
        year: 2025,
        description: '2025年のプロジェクトアーカイブ',
        stats: {
            posts: '100+',
            likes: '準備中',
            retweets: '準備中'
        },
        link: './2025/index.html'
    }
];

// ページ読み込み時に年別カードを生成
document.addEventListener('DOMContentLoaded', () => {
    const yearGrid = document.getElementById('yearGrid');

    // 年を降順でソート（新しい年が上に来るように）
    const sortedYears = [...yearsData].sort((a, b) => b.year - a.year);

    sortedYears.forEach(yearData => {
        const card = createYearCard(yearData);
        yearGrid.appendChild(card);
    });
});

// 年別カードを生成する関数
function createYearCard(data) {
    const card = document.createElement('a');
    card.className = 'year-card';
    card.href = data.link;

    card.innerHTML = `
        <h3>${data.year}</h3>
        <p>${data.description}</p>
        <div class="stats">
            <div class="stat-item">
                <span class="stat-label">投稿数</span>
                <span class="stat-value">${data.stats.posts}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">いいね数</span>
                <span class="stat-value">${data.stats.likes}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">リポスト数</span>
                <span class="stat-value">${data.stats.retweets}</span>
            </div>
        </div>
    `;

    return card;
}
