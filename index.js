// 图片轮播
let speed = -3;
// 所有需要处理的元素ID列表
const elementIds = [
    'main20250103', 'main2025422', 'main2025420', 'main2025421', 'main2025317',
    'main2024824', 'main2025518', 'main2025517', 'main2025515', 'main2025514',
    'main20241118', 'main2025516', 'main2025519', 'main2024830', 'main2025416',
    'main202542', 'main2025417', 'main2025418', 'main2025419', 'main2025415',
    'main2025413', 'main202552', 'main2025428',  'main2024727','main20250102',
    'main202472', 'main2024626', 'main2024515', 'main2018822', 'main2019727',
    'main20211114', 'main20211122', 'main2022120', 'main202276', 'main2022119',
    'main202317', 'main2024321', 'main2024530', 'main2024521', 'main202454',
    'main2024415', 'main202437', 'main2024216', 'main2024114', 'main202418',
    'main2023124', 'main2023116', 'main2023104', 'main2023109', 'main2023718',
    'main202393', 'main2023823', 'main202373', 'main2023520', 'main202337',
    'main20250613', 'main20141109','main20250612','main20180911','main20150320',
    'main20160829','main20170115','main20170311','main20170329','main20171008',
    'main20180226','main20180507','#main20250803','main20250814','main20250724',
    'main20250729','main20250806','main20190727','main20250803','main20241114',
    'main20250815','main20250813','main20250807','main20250808','main20250609',
    'main20250610','main20250611','main20250608','main20250603','main20250605',
    'main20250606','main20250528','main20250816','main20250817',
];
// 获取所有元素引用并存储
const elements = elementIds.map(id => {
    const el = document.getElementById(id);
    return el;
});
// 统一初始化元素内容（复制四次）
elements.forEach(el => {
    if (el) {
        const originalHTML = el.innerHTML;
        el.innerHTML = originalHTML + originalHTML + originalHTML+ originalHTML; // 复制两次，共三份
    }
});
// 动画主函数
function move() {
    elements.forEach(el => {
        if (!el) return;
        // 检查是否需要重置位置
        if (el.offsetLeft < -el.offsetWidth / 2) {
            el.style.left = '0px';
        }
        // 更新位置
        el.style.left = `${el.offsetLeft + speed}px`;
    });
}
// 启动动画
const timer = setInterval(move, 30);

// 图片懒加载逻辑
const lazyLoadImages = () => {
    const images = document.querySelectorAll('[data-src]'); // 获取所有带有 data-src 的元素
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src'); // 获取 data-src 的值
                img.style.backgroundImage = `url(${src})`; // 设置背景图片
                observer.unobserve(img); // 停止观察该元素
            }
        });
    }, {
        root: null, // 视口
        rootMargin: '0px',
        threshold: 0.1 // 至少10%进入视口时触发
    });
    images.forEach(img => {
        observer.observe(img); // 观察每个图片容器
    });
};
// 调用图片懒加载函数
lazyLoadImages();
document.addEventListener("DOMContentLoaded", function() {
    // 获取所有需要懒加载的图片
    const lazyImages = document.querySelectorAll('.lazy-image');
    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src'); // 获取 data-src 属性
                if (src) {
                    img.src = src; // 设置图片的 src 属性
                    img.classList.remove('lazy-image'); // 移除懒加载类
                    observer.unobserve(img); // 停止观察该图片
                }
            }
        });
    }, {
        root: null, // 使用浏览器视口作为根元素
        rootMargin: '0px',
        threshold: 0.1 // 至少10%的图片进入视口时触发
    });
    // 观察所有需要懒加载的图片
    lazyImages.forEach(img => {
        observer.observe(img);
    });
});

// 搜索
const search=()=>{
    const searchbox=document.getElementById("search-item").value.toUpperCase();
    const storeitems=document.getElementById("product-list")
    const product=document.querySelectorAll(".product")
    const pname=storeitems.getElementsByTagName("h2")
    for(var i=0;i<pname.length;i++){
        let match=product[i].getElementsByTagName('h2')[0];
        if(match){
            let textvalue=match.textContent||match.innerHTML
            if(textvalue.toUpperCase().indexOf(searchbox)>-1){
                product[i].style.display="";
            }else{
                product[i].style.display="none";
            }
        }
    }
}

// 返回顶部
    function scrollToTop() {
        document.body.scrollTop = 0; // 对Safari
        document.documentElement.scrollTop = 0; // 对Chrome, Firefox, IE 和 Opera
        }
        // 滚动事件监听器，用于显示/隐藏返回顶部按钮
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('backToTop').style.display = 'block';
            } else {
            document.getElementById('backToTop').style.display = 'none';
            }
            };

// 排序
let isAscending = true; // 用于记录当前排序方向
function toggleOrder() {
    const container = document.getElementById('container');
    const contents = Array.from(container.querySelectorAll('.content'));
    // 按日期格式排序
    contents.sort((a, b) => {
        return isAscending ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });
    // 清空容器并重新插入排序后的元素
    contents.forEach(content => {
        container.appendChild(content);
    });
    // 切换排序方向
    isAscending = !isAscending;
}

// 音乐播放器
const songLists = {
    honor: [
        { path: "./bgm/Côme - La gloire à mes genoux.mp3" },
    ],
    timeline: [
        { path:"./bgm/Taylor Swift - Love Story.mp3",},
        { path:"./bgm/陈奕迅 eason and the duo band - 我们万岁.mp3",},
        { path:"./bgm/Jake Miller - Lucky Me.mp3",},
        { path: "./bgm/AGA - 圆.mp3" },
        { path:"./bgm/Sebastián Yatra Isabela Moner - My Only One (No H.mp3",},
        { path:"./bgm/莫文蔚 - 慢慢喜欢你.mp3" },
        { path:"./bgm/Christina Perri - A Thousand Years.mp3" },
        { path:"./bgm/陈奕迅 - 无条件.mp3" },
        { path:"./bgm/JVKE - golden hour.mp3" },
        { path:"./bgm/Christina Perri - A Thousand Years.mp3" },
    ],
    ymvideo: [
        { path:"./bgm/Christina Perri - A Thousand Years.mp3" },
    ],
    ymnovel: [
        { path:"./bgm/陈奕迅 - 无条件.mp3" },
    ],
    ymdraw: [
        { path:"./bgm/卫兰 - My Cookie Can.mp3" },
    ],
    ymdb: [
        { path:"./bgm/莫文蔚 - 慢慢喜欢你.mp3" },
    ],
    ympic: [
        { path:"./bgm/JVKE - golden hour.mp3" },
    ],
    ympp: [
        { path:"./bgm/吴雨霏 - 苏眉.mp3" },
    ],
    
};
// 获取当前页面的文件名（去掉扩展名）
const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
// 初始化音乐播放器
function initMusicPlayer(songList) {
    const playPause = document.querySelector('.playPause');
    const next = document.querySelector('.next');
    const audio = document.querySelector('audio');
    // 加载歌曲
    const loadSong = (song) => {
        audio.src = song.path;
    };
    let i = 0; // 当前播放的歌曲索引
    loadSong(songList[i]); // 加载第一首歌曲
    let songPlaying = true; // 当前是否正在播放
    audio.play(); // 开始播放
    // 播放歌曲
    const playSong = () => {
        songPlaying = true;
        audio.play();
        playPause.classList.add('active');
        playPause.innerHTML = '<span class="material-icons">pause</span>';
    };
    // 暂停歌曲
    const pauseSong = () => {
        songPlaying = false;
        audio.pause();
        playPause.classList.remove('active');
        playPause.innerHTML = '<span class="material-icons">play_arrow</span>';
    };
    // 播放/暂停歌曲
    playPause.addEventListener("click", () => (songPlaying ? pauseSong() : playSong()));
    // 下一首歌曲
    const nextSong = () => {
        i++;
        if (i > (songList.length - 1)) {
            i = 0; // 如果超出列表范围，回到第一首
        }
        loadSong(songList[i]); // 加载下一首歌曲
        playSong(); // 播放下一首歌曲
    };
    // 播放完毕监听事件（自动播放下一首）
    audio.addEventListener("ended", nextSong);
}
// 根据当前页面加载对应的歌曲列表
if (songLists[currentPage]) {
    initMusicPlayer(songLists[currentPage]);
} else {
    console.error('No song list found for the current page');
}