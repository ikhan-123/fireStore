import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "./config.js";


const from = document.querySelector("#form")
const todo = document.querySelector("#todo")
const ul = document.querySelector("#ul")
const select = document.querySelector("#select")
const cities_btn = document.querySelectorAll(".cities_btn")
const reset_btn = document.querySelector("#reset")

let arr = [];

reset_btn.addEventListener('click', ()=> {
    arr = []
    getData()
})

cities_btn.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
        arr = []
        console.log(btn.innerHTML);
        const citiesRef = collection(db, "todos");
        const q = query(citiesRef, where("cities", "==", btn.innerHTML));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id })
        });
        console.log(arr);
        renderScreen()
    })
})

async function getData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id })
    });
    console.log(arr);
    renderScreen();
}
getData();


function renderScreen() {
    ul.innerHTML = ''
    arr.map((item) => {
        ul.innerHTML += `
        <li> ${item.todo} - ${item.cities}
        <button class="deleteBtn">delete</button>
        <button class="editBtn">Edit</button>
        </li>`
    })

    let deleteBtn = document.querySelectorAll('.deleteBtn')
    let editBtn = document.querySelectorAll('.editBtn')

    // delete button
    deleteBtn.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete');
            await deleteDoc(doc(db, "todos", arr[index].id));
            arr.splice(index, 1)
            renderScreen()
        })
    })

    // edit button
    editBtn = document.querySelectorAll('.editBtn')
    editBtn.forEach((btn, index) => [
        btn.addEventListener('click', async () => {
            let updateValue = prompt('enter new value')
            const updateFbTodo = doc(db, "todos", arr[index].id);

            // Set the "capital" field of the city 'DC'
            await updateDoc(updateFbTodo, {
                todo: updateValue
            });
            arr[index].todo = updateValue
            renderScreen()
        })
    ])

}



from.addEventListener("submit", async (event) => {
    event.preventDefault();
    arr.push({
        todo: todo.value,
        cities: select.value
    });
    renderScreen();
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: todo.value,
            cities: select.value
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

