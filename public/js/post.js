const postId = document.location.pathname.split('/').pop();
var contentDiv = document.getElementById('post-div');
var contentHeight = contentDiv.offsetHeight;
console.log(contentHeight);

const editBtnHandler = async (event) => {
    event.preventDefault();

    var content = contentDiv.innerText.trim();
    contentDiv.innerHTML = "";
    var textInput = document.createElement('textarea');
    textInput.setAttribute('id', 'post-input');
    textInput.setAttribute('oninput', 'this.style.height = "";this.style.height = this.scrollHeight + "px"');
    textInput.value = content;
    contentDiv.append(textInput);

    textInput.style.height = `${contentHeight*.8}px`;
    editBtn = event.target;
    editBtn.innerText = "SAVE";
    editBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        content = textInput.value.trim();

        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert('Failed to update post');
        }
    });
}

const newFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();

    if (content) {
        const response = await fetch(`/api/posts/comment`, {
            method: 'POST',
            body: JSON.stringify({
                post_id: parseInt(postId),
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert('Failed to create comment');
        }
    }
};

const delBtnHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete post');
    }
}

var delBtn = document.getElementById('del-btn');
var editBtn = document.getElementById('edit-btn');
if (delBtn && editBtn) {
    delBtn.addEventListener('click', delBtnHandler);
    editBtn.addEventListener('click', editBtnHandler);

}

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);