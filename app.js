

auth.onAuthStateChanged(user => {
    getTodo();
})



const logout = document.getElementById("logout");
logout.addEventListener("click", e => {
    e.preventDefault();
    auth.signOut().then(() => window.location = "login.html")
        .catch(err => console.log(err))

})


const ul = document.querySelector("#todo-list")
const form = document.querySelector('#agd-to-form')
const updatebtn = document.querySelector('#update')
var current_user = null;
let newTitle = '';
let updateID = null;
function renderList(doc) {
    let li = document.createElement('li')
    li.className = "collection-item";
    li.setAttribute('data-id', doc.id)
    let div = document.createElement('div')
    let title = document.createElement('span')
    title.textContent = doc.data().title;
    let idel = document.createElement('i')
    idel.className = "material-icons secondary-content";
    idel.innerText = "delete"
    let anchor = document.createElement('a');
    anchor.href = "#modal-edit"
    anchor.className = "modal-trigger secondary-content"
    let iedit = document.createElement('i')
    iedit.className = "material-icons";
    iedit.innerText = "edit"
    div.appendChild(title);
    div.appendChild(idel);
    anchor.appendChild(iedit);
    div.appendChild(anchor);
    li.appendChild(div);
    idel.addEventListener("click", e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        db.collection('alltodos').doc(current_user.uid).collection('todos').doc(id).delete();
    })
    iedit.addEventListener("click", e => {
        updateID = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');

    })
    ul.append(li)
}

updatebtn.addEventListener("click", e => {
    newTitle = document.getElementById('newTitle').value
    db.collection('alltodos').doc(current_user.uid).collection('todos').doc(updateID).update({
        title: newTitle
    })
    document.getElementById('newTitle').value='';
})

form.addEventListener("submit", e => {
    e.preventDefault();
    db.collection('alltodos').doc(current_user.uid).collection('todos').add({
        title: form.title.value
    })
    form.title.value = '';
})

function getTodo() {
    ul.innerHTML = '';
    current_user = auth.currentUser;
    document.getElementById("user-email").innerHTML = (current_user != null ? current_user.email : '')
    db.collection('alltodos').doc(current_user.uid).collection('todos').orderBy('title').onSnapshot(snapshot => {
        let changes = snapshot.docChanges()
        changes.forEach(change => {
            if (change.type == 'added') {
                renderList(change.doc)
            }
            else if (change.type == 'removed') {
                let li = ul.querySelector(`[data-id=${change.doc.id}]`)
                li.remove();
            }
            else if (change.type == 'modified') {
                let li = ul.querySelector(`[data-id=${change.doc.id}]`)
                li.getElementsByTagName('span')[0].innerHTML = newTitle
                newTitle = '';
            }
        });
    })
}