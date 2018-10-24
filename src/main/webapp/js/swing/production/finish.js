//防止页面后退
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

const status = sessionStorage.getItem('answer_status');

if (status === 'C'){
    $('#title').text('问卷完成，感谢您的参与！')
} else {
    $('#title').text('您不符合本次调研的需求，感谢您的参与！')
}
