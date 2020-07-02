const byId = (id) => document.getElementById(id).value

const database = firebase.database();

const courses =  database.ref('/courses');

const createCourse = () =>{

    const autoId = courses.push().key;

    courses.child(autoId).set({
        courseName:byId('courseName'),
        coursePrice:byId('coursePrice'),
        courseDescription:byId('courseDescription'),
        courseLogo:byId('courseLogo')
    })
    document.getElementsByClassName('input')[0].value = '';
    document.getElementsByClassName('input')[1].value = '';
    document.getElementsByClassName('input')[2].value = '';
    document.getElementsByClassName('input')[3].value = '';
}

document.getElementById('create').addEventListener('click', createCourse);

const deleteCourse = (id) => {
    courses.child(id).remove()}

    const plus = (sumNumber) => {
        const number = document.querySelector('.number').textContent
        console.log("plus -> sumNumber", sumNumber)
        const x = +number + 1;
        const delta = x* sumNumber;
        document.querySelector('.number').innerText =`${x}`
        document.querySelector('.sum').innerText =`${delta}`
    }
    const minus = (sumNumber) => {
        const number = document.querySelector('.number').textContent
        if((+number) > 1){
        const x = +number - 1;
        const delta = x* sumNumber;
        document.querySelector('.sum').innerText =`${delta}`
        document.querySelector('.number').innerText =`${x}`
        }
    }
    const save = () => {
    }
    const addCourse = (id) => {
        document.querySelector('#general').style.display = 'none';
        const addModal = document.getElementById('addModal');
        addModal.innerHTML = `
        <div class="options">
             <div id="courseoptions">
                  <p class="thisCourse">Course</p>
                   <div class="img"></div>
                   <p class="thisCourseName"></p>
                   <p class="thisCourseDescripton"></p>
                <p class="thiseCoursePrice"></p>
             </div>
             <div class="buttons">
                 <p class="pluseMinuse">pluse and minuse</p>
                 <button id="plus">Plus(+)</button>
                 <p class="number">1</p>
                 <button id="minus">Minus(-)</button>
             </div>
             <div id="summa">
                 <p class="allCourse">Summa</p>
                 <p class="sum"></p>
             </div>
             <div class="end">
                 <button id="endOptions">Save</button>
             </div>
        </div>
        `;
        document.querySelector('.img').style.background = `url(${id.courseLogo})`;
        const thisCourseName = document.querySelector('.thisCourseName').innerHTML = `${id.coursesName}`;
        const thisCourseDescripton = document.querySelector('.thisCourseDescripton').innerHTML = `${id.courseDescription}`;
        const thiseCoursePrice = document.querySelector('.thiseCoursePrice').innerHTML = `${id.coursePrice}`;
        const sum = document.querySelector('.sum').innerHTML = `${id.coursePrice}`
        const sumx = document.querySelector('.sum').textContent
        const sumNumber = +sumx;
        const plusButton = document.querySelector('#plus');
            plusButton.addEventListener('click', (e) => {
                e.preventDefault();
                plus(sumNumber)
        })
        const minusButton = document.querySelector('#minus');
        minusButton.addEventListener('click', (e) => {
            e.preventDefault();
            minus(sumNumber)
        })
        const saveButton = document.getElementById('endOptions');
        saveButton.addEventListener('click',(e) => {
            e.preventDefault();
            save()
        })
    }

const editCourse = (id) =>{
    
    document.querySelector('#general').style.display ='none';
    const modal = document.getElementById('modal')
    modal.innerHTML = `<label for="courseName">Course Name</label>
    <input type="text" placeholder="Course Name" id="courseName">
    <label for="coursePrice">Course Price</label>
    <input type="text" placeholder="Course Price" id="coursePrice">
    <label for="courseDescription">Course Description</label>
    <input type="text" placeholder="Course Description" id="courseDescription">
    <label for="logo">IMG</label>
    <input type="text" placeholder="IMG URL" id="courseLogo">
    <button id="editButton">Edit</button>`

    const editButton = document.getElementById('editButton');
    editButton.addEventListener('click', ()=> {

        const newData = {
            courseName:byId('courseName'),
            coursePrice:byId('coursePrice'),
            courseDescription:byId('courseDescription'),
            courseLogo:byId('courseLogo')
        }
        courses.child(id).update(newData)
        
        modal.innerHTML = ''
        document.querySelector('#general').style.display ='block';

    })

    const newData = {
        courseName:byId('courseName'),
        coursePrice:byId('coursePrice'),
        courseDescription:byId('courseDescription'),
        courseLogo:byId('courseLogo')
    }
    courses.child(id).update(newData)
}

    (function () {
        const courseList = document.getElementById('courseList');
        courses.orderByKey().on('value', data => {
            courseList.innerHTML = '';
            Object.entries(data.val()).map((data) => {
                const div = document.createElement('div');
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                const img = document.createElement('img');
                const delet = document.createElement('button');
                const add = document.createElement('button')
                const edit = document.createElement('button')
                const span = document.createElement('span');
                h2.innerHTML = data[1].courseName;
                p.innerHTML = data[1].courseDescription;
                img.src = data[1].courseLogo;
                span.innerHTML = data[1].coursePrice;
                delet.innerHTML = 'delete';
                add.innerHTML ='Add'
                edit.innerHTML = 'Edit'
                div.appendChild(h2);
                div.appendChild(p);
                div.appendChild(span);
                div.appendChild(img);
                div.appendChild(delet);
                div.appendChild(add);
                div.appendChild(edit);
                courseList.appendChild(div);
                delet.addEventListener('click', (e) => {
                    deleteCourse(data[0])
                })
                edit.addEventListener('click',(e) =>{
                    e.preventDefault()
                    editCourse(data[0])
                })

                add.addEventListener('click',(e) =>{
                    e.preventDefault()
                    addCourse(data[1])
                })
            })
        })
    })()