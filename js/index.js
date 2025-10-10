// 整体三条的画面


// 1. 获取DOM元素
const leftNav = document.querySelector('.content .left_nav');
const rightTopicArea = document.querySelector('.content .right_topic_area');
const middleContent = document.querySelector('.content .middle_content');

// 2. 计算并设置中间宽度的函数
function calculateMiddleWidth() {
    const leftWidth = parseFloat(getComputedStyle(leftNav).width);
    const rightWidth = parseFloat(getComputedStyle(rightTopicArea).width);
    const middleWidth = window.innerWidth - leftWidth - rightWidth;
    middleContent.style.width = `${middleWidth}px`;
}

// 3. 绑定事件，确保响应式
window.addEventListener('load', calculateMiddleWidth);
window.addEventListener('resize', calculateMiddleWidth);
















// 注册登录界面
// const screen = document.querySelector('#screen');
//
// const container = document.querySelector('#container');
// const signInButton = document.querySelector('#signIn');
// const signUpButton = document.querySelector('#signUp');
// const cancel = document.querySelector('.cancel');
// const login = document.querySelector('#login');
//
//
// signUpButton.addEventListener('click', () => container.classList.add('right-paner-active'));
// signInButton.addEventListener('click', () => container.classList.remove('right-paner-active'));
//
//
// cancel.addEventListener('click', () => {
//     container.style.display = "none";
//     cancel.style.display = "none";
//     screen.style.display = "none";
//
// })
//
// login.addEventListener('click', () => {
//     container.style.display = "block";
//     cancel.style.display = "block";
//     screen.style.display = "block";
// })






// 帮助和建议
const help = document.querySelector('#help')
const inside_help = document.querySelector('#inside_help')
const inside_help_cancel = document.querySelector('#inside_help_cancel')

const suggest = document.querySelector('#suggest')
const inside_suggest = document.querySelector('#inside_suggest')
const inside_suggest_cancel = document.querySelector('#inside_suggest_cancel')


help.addEventListener('click', () => {
    inside_help.style.display = "block";
    inside_help_cancel.style.display = "block";
    screen.style.display = "block";
})
inside_help_cancel.addEventListener('click', () => {
    inside_help.style.display = "none";
    inside_help_cancel.style.display = "none";
    screen.style.display = "none";
})

suggest.addEventListener('click', () => {
    inside_suggest.style.display = "block";
    inside_suggest_cancel.style.display = "block";
    screen.style.display = "block";
})
inside_suggest_cancel.addEventListener('click', () => {
    inside_suggest.style.display = "none";
    inside_suggest_cancel.style.display = "none";
    screen.style.display = "none";
})






































// 帖子部分

// const ul_longPost = document.querySelector('#longPost');
// const singlePost = document.querySelector('#singlePost');
// const ul_longPost_li_as = document.querySelectorAll('#longPost li a');
// const singlePost_back = document.querySelector('#singlePost_back');
//
// document.addEventListener('DOMContentLoaded', function() {
//     const singlePostBack = document.querySelector('#singlePost_back');
//     if (singlePostBack) {
//         singlePostBack.addEventListener('click', function() {
//             document.getElementById('longPost').style.display = 'block';
//             document.getElementById('singlePost').style.display = 'none';
//         });
//     }
// });
//
//
// 单个帖子往返
// ul_longPost_li_as.forEach(function (ul_longPost_li_a) {
//     ul_longPost_li_a.addEventListener('click', () => {
//         e.preventDefault();
//         ul_longPost.style.display = "none";
//         singlePost.style.display = "block";
//         // ul_longPost.style.opacity = "0";
//         // singlePost.style.opacity = "1";
//         // ul_longPost.style.zIndex = "1";
//         // singlePost.style.zIndex = "2";
//
//     })
//
// })
// singlePost_back.addEventListener('click', () => {
//     ul_longPost.style.display = "block";
//     singlePost.style.display = "none";
    // ul_longPost.style.opacity = "1";
    // singlePost.style.opacity = "0";
    // ul_longPost.style.zIndex = "2";
    // singlePost.style.zIndex = "1";
// })
// axios部分
// axios.get('http://127.0.0.1:8080/posts').then((result) => {
//     console.log(result.data);
// }).catch(err => {
//     console.log(err);
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const singlePostBack = document.querySelector('#singlePost_back');
//     if (singlePostBack) {
//         singlePostBack.addEventListener('click', function() {
//             document.getElementById('longPost').style.display = 'block';
//             document.getElementById('singlePost').style.display = 'none';
//         });
//     }
// });







// AI部分
// 帖子数据渲染相关函数
// const postContainer = document.querySelector('.content .middle_content ul');
// const postList = document.querySelector('.content .middle_content ul');
// const backBtn = document.querySelector('#singlePost_back');

// // 1. 获取并渲染帖子列表
// async function renderPostList() {
//     try {
//         // 使用 axios.get 简化写法获取帖子列表
//         const response = await axios.get('/api/posts');
//         const posts = response.data;

//         // 清空现有列表
//         postContainer.innerHTML = '';

//         // 渲染每个帖子
//         posts.forEach(post => {
//             const li = document.createElement('li');
//             li.innerHTML = `
//         <h3><a href="javascript:;" class="post-title" data-id="${post.id}">${post.title}</a></h3>
//         <p>${post.content.substring(0, 100)}...</p>
//         <div class="every_bottom">
//           <p>作者: ${post.author}</p>
//           <div>
//             <span>点赞 ${post.likes}</span>
//             <span>评论 ${post.comments}</span>
//           </div>
//         </div>
//       `;
//             postContainer.appendChild(li);
//         });

//         // 绑定帖子点击事件
//         document.querySelectorAll('.post-title').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const postId = btn.getAttribute('data-id');
//                 renderSinglePost(postId);
//             });
//         });

//     } catch (error) {
//         console.error('获取帖子列表失败:', error);
//         postContainer.innerHTML = '<li>加载帖子失败，请稍后重试</li>';
//     }
// }

// // 2. 获取并渲染单个帖子详情
// async function renderSinglePost(postId) {
//     try {
//         // 使用 axios.get 带参数请求单个帖子
//         const response = await axios.get(`/api/posts/${postId}`);
//         const post = response.data;

//         // 填充详情内容
//         document.querySelector('#singlePost_topic_in').textContent = post.title;
//         document.querySelector('#singlePost_user_information_userName').textContent = post.author;
//         document.querySelector('#singlePost_user_information_time').textContent = post.createTime;
//         document.querySelector('#singlePost_content').textContent = post.content;

//         // 切换显示状态（隐藏列表，显示详情）
//         postList.style.display = 'none';
//         singlePost.style.display = 'block';

//     } catch (error) {
//         console.error('获取帖子详情失败:', error);
//         singlePost.innerHTML = '<p>加载帖子详情失败</p><button id="singlePost_back">返回</button>';
//     }
// }

// // 3. 发布评论功能
// async function publishComment(postId, content) {
//     try {
//         // 使用 axios.post 提交评论
//         const response = await axios.post('/api/comments', {
//             postId: postId,
//             content: content
//         });

//         // 评论成功后重新获取帖子详情
//         renderSinglePost(postId);
//         return response.data;

//     } catch (error) {
//         console.error('发布评论失败:', error);
//         alert('评论发布失败，请重试');
//     }
// }

// // 绑定返回按钮事件
// backBtn.addEventListener('click', () => {
//     singlePost.style.display = 'none';
//     postList.style.display = 'block';
// });

// // 绑定评论提交事件
// document.querySelector('#singlePost_reply_write button').addEventListener('click', () => {
//     const postId = document.querySelector('.post-title.active')?.getAttribute('data-id');
//     const commentContent = document.querySelector('#singlePost_reply_write textarea').value;

//     if (postId && commentContent) {
//         publishComment(postId, commentContent);
//     }
// });

// // 初始加载帖子列表
// renderPostList();













// 用户中心
//页面元素获取
// const userCenter = document.getElementById('user-center')
// const content_userCenter = document.getElementById('content_userCenter')
// const ul_longPost = document.getElementById('longPost');
//
//
//
// content_userCenter.addEventListener('click', () => {
//     ul_longPost.style.display = "none";
//     userCenter.style.display = "block";
// })
// document.addEventListener('click', (e) => {
//     const target = e.target; // 点击的目标元素
//
//     // 判断点击是否在 userCenter 内部（包括子元素）
//     const isInUserCenter = target.closest('#user-center') !== null;
//     // 判断点击是否在 content_userCenter 内部（包括子元素）
//     const isInContentUserCenter = target.closest('#content_userCenter') !== null;
//
//     // 若点击“外部区域”，则互换 display
//     if (!isInUserCenter && !isInContentUserCenter) {
//         ul_longPost.style.display = "block";
//         userCenter.style.display = "none";
//     }
// });


const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const infoValues = document.querySelectorAll('.info-value');
const infoInputs = document.querySelectorAll('.info-input');
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');

// ---------- 1. 初始化：从后端获取用户信息 ----------
async function fetchUserInfo() {
    try {
        const response = await axios.get('/api/user/info');
        const user = response.data;

        // 填充用户数据到页面
        document.getElementById('account').textContent = user.account;
        document.getElementById('accountInput').value = user.account;
        document.getElementById('nickname').textContent = user.nickname;
        document.getElementById('nicknameInput').value = user.nickname;

        document.getElementById('email').textContent = user.email;
        document.getElementById('emailInput').value = user.email;

        document.getElementById('college').textContent = user.college;
        document.getElementById('collegeInput').value = user.college;
        document.getElementById('major').textContent = user.major;
        document.getElementById('majorInput').value = user.major;
        document.getElementById('hobby').textContent = user.hobby;
        document.getElementById('hobbyInput').value = user.hobby;
        document.getElementById('collectCount').textContent = user.collectCount;
        document.getElementById('collectCountInput').value = user.collectCount;
        document.getElementById('commentCount').textContent = user.commentCount;
        document.getElementById('commentCountInput').value = user.commentCount;

        // 处理头像（如果后端返回了头像 URL）
        if (user.avatarUrl) {
            avatar.style.backgroundImage = `url(${user.avatarUrl})`;
            avatar.style.backgroundSize = 'cover';
            avatar.style.color = 'transparent'; // 隐藏“头像”文字
        }
    } catch (error) {
        console.error('获取用户信息失败：', error);
        // alert('获取用户信息失败，请稍后重试');
    }
}

// ---------- 2. 切换“编辑/查看”模式 ----------
function switchToEditMode() {
    // 显示输入框、隐藏文本值
    infoValues.forEach(el => el.style.display = 'none');
    infoInputs.forEach(el => {
        if (!el.disabled) { // 非禁用的输入框才显示（如“账号”“收藏数”禁用，不显示）
            el.style.display = 'block';
        }
    });
    // 切换按钮显示状态
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
    // 编辑时暂时禁用头像点击（可选，也可保留上传）
    avatar.style.cursor = 'default';
}

function switchToViewMode() {
    // 隐藏输入框、显示文本值
    infoInputs.forEach(el => el.style.display = 'none');
    infoValues.forEach(el => el.style.display = 'block');
    // 切换按钮显示状态
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    // 恢复头像点击
    avatar.style.cursor = 'pointer';
}

// ---------- 3. 保存资料修改 ----------
async function saveChanges() {
    // 收集需要提交的修改数据（只包含可编辑字段）
    const updatedData = {
        nickname: document.getElementById('nicknameInput').value,
        college: document.getElementById('collegeInput').value,
        major: document.getElementById('majorInput').value,
        hobby: document.getElementById('hobbyInput').value
        // 账号、收藏数、评论数等不可修改，无需提交
    };

    try {
        // 【替换点】实际开发中，将 URL 改为后端“更新用户资料”的接口
        await axios.put('/api/user/update', updatedData);
        // 更新成功后，重新拉取用户信息并切回查看模式
        fetchUserInfo();
        switchToViewMode();
        alert('资料修改成功');
    } catch (error) {
        console.error('保存资料失败：', error);
        alert('保存资料失败，请稍后重试');
    }
}

//4. 头像上传（可选：需后端支持文件上传）
avatarInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            // 先在前端预览头像
            avatar.style.backgroundImage = `url(${event.target.result})`;
            avatar.style.backgroundSize = 'cover';
            avatar.style.color = 'transparent';

            // 【替换点】实际开发中，用 Axios 把头像文件上传到后端
            const formData = new FormData();
            formData.append('avatar', file);
            axios.post('/api/user/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 上传文件需指定该头
                }
            }).then(response => {
                alert('头像上传成功');
            }).catch(error => {
                console.error('头像上传失败：', error);
                alert('头像上传失败，请稍后重试');
            });
        };
        reader.readAsDataURL(file); // 读取文件为 Base64 格式
    }
});

// ---------- 5. 绑定按钮事件 ----------
editBtn.addEventListener('click', switchToEditMode);
saveBtn.addEventListener('click', saveChanges);
cancelBtn.addEventListener('click', switchToViewMode);
// 点击头像触发文件选择
avatar.addEventListener('click', function () {
    if (editBtn.style.display !== 'none') { // 只有“查看模式”可上传头像
        avatarInput.click();
    }
});

// 页面加载时，初始化获取用户信息
fetchUserInfo();