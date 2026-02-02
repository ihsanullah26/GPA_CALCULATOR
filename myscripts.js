let courses = [];
let Semester = [];
let serNO = 0;
window.addEventListener('DOMContentLoaded' , () =>{
    document.querySelector('.mainArea').replaceChildren((document.querySelector('.Content1')))
})

//function to fetch data from the form and store it in course for later on calculation 
function addRow() {
    //Read values from the form
    const coursename = document.getElementById("CourseName").value;
    const credithour = parseFloat(document.getElementById("crdhrs").value);
    const grade = parseFloat(document.getElementById("grade").value);

    //validate 
    if (!coursename || isNaN(credithour) || isNaN(grade)) {
        alert("Please filled all field correctly");
        return;
    }

    //store the result in courses
    courses.push({ coursename, credithour, grade });
    //fetch the table from the html page 
    let CourseTable = document.getElementById("CourseTable").querySelector("tbody");
    let newrow = CourseTable.insertRow();
    newrow.insertCell(0).innerText = coursename;
    newrow.insertCell(1).innerText = credithour;
    newrow.insertCell(2).innerText = grade;
    const deletecell = newrow.insertCell(3);
    const index = courses.length - 1;
    newrow.dataset.index = index;
    
    const deletebutton = document.createElement('button')
    deletebutton.innerText = 'Delete Row';
    deletebutton.onclick = () => deleteRow(newrow,courses,"CourseTable")
    deletecell.appendChild(deletebutton);

    document.getElementById("CourseName").value="";
    document.getElementById("crdhrs").value="";
    document.getElementById("grade").value="";


}
//function to delete a specefic row from the dynamically growing tabe
function deleteRow(rowtobeDeleted,arr,NAME)
{
    
    const index = rowtobeDeleted.dataset.index;
    arr.splice(index,1)

    rowtobeDeleted.remove()

    reindexRows(NAME);

}

//function to reindex rows
function reindexRows(name)
{
    
    let rows = document.getElementById(name).querySelector('tr')

    for(let i = 0 ; i <rows.length; i++)
    {   
          rows.dataset.index = i;
    }
    
}
//function to calculate sgpa 
function calculateSGPA() {
    const SGPAplace = document.getElementById('SGPAPLACE');
    SGPAplace.textContent = 'SGPA : '
    let totalcredithours = 0;
    let totalgradepoints = 0;
   
    courses.forEach(course => {
        totalcredithours += course.credithour;
        totalgradepoints += (course.credithour * course.grade)
    })
    if(totalcredithours === 0)
    {
        alert("Please Add some Course Record");
        SGPAplace.textContent = 'SGPA : 0'
        return;
    }
    let SGPA = totalgradepoints / totalcredithours;
    SGPAplace.textContent += SGPA.toFixed(2);
}

//function to calculate the CGPA
function calculateCGPA(){
    let totalSGPA = 0;
    let totalSemester = 0;
    
    const CGPAPlace = document.getElementById('CGPAPLACE')
    Semester.forEach(semester =>{
        totalSGPA += semester.sgpa;
        totalSemester+=1;
    })
    if(totalSemester === 0)
    {
        alert("Please Add some semester Record");
        CGPAPlace.textContent = 'CGPA : 0'
        return;
    }

    let CGPA = totalSGPA / totalSemester;
    CGPAPlace.textContent = 'CGPA : '
    CGPAPlace.textContent += CGPA.toFixed(2)
}
//function to add a row to the table in the sgpa section means tab2 
function addSemesterRecord() {
    //Read value from the form
    let semName = document.getElementById("SemesterName").value;
    let sgpa = parseFloat(document.getElementById("sgpa").value);

    //validate
    if (!semName || isNaN(sgpa)) {
        alert("Please fill all field first\n");
        return;
    }
   if(sgpa <0)
   {
    alert("SGPA cannot be negitive");
    return;
   }
    let semtable = document.getElementById("SemesterTable").querySelector("tbody");
    let newRow = semtable.insertRow();
    newRow.insertCell(0).innerText = serNO++;
    newRow.insertCell(1).innerText = semName;
    newRow.insertCell(2).innerText = sgpa;
    Semester.push({ serNO, semName, sgpa });

    const deletecell = newRow.insertCell(3);
    const index = Semester.length-1;
    newRow.dataset.index = index;

    //create the delete button
    const deletebutton = document.createElement('button')
    deletebutton.innerText = 'Delete Row';
    deletebutton.onclick = () =>deleteRow(newRow,Semester,"SemesterTable")  
    deletecell.appendChild(deletebutton);
    
    document.getElementById('SemesterName').value = ""
    document.getElementById('sgpa').value = ""
}




const mainContentArea = document.querySelector('.mainArea')

const renderGradeTable = ({ grading_system }) => {

    mainContentArea.innerHTML = ''

    // console.log(grading_system)
    const table = document.createElement('table')
    const tableHead = document.createElement('thead')
    const heading = tableHead.insertRow()
    heading.insertCell(0).innerText = 'S no'
    heading.insertCell(1).innerText = 'Range'
    heading.insertCell(2).innerText = 'Grade'
    const tableBody = document.createElement('tbody')
    
    grading_system.map(item => {
        const row = tableBody.insertRow()
        row.insertCell(0).innerText = item.rank
        row.insertCell(1).innerText = item.range
        row.insertCell(2).innerText = item.grade
    })

    table.appendChild(tableHead)
    table.appendChild(tableBody)

    mainContentArea.appendChild(table)
    
}
const btn2 = document.querySelector('#content3')
btn2.addEventListener('click',() => {
        console.log('here')
        fetch('./tableData.json')
            .then((res) => res.json())
                .then(renderGradeTable)
                    .catch(() => {console.log('masla hai')})
})


//function to handle when Point table button is clicked
 const renderPointTable = ({grade_points}) =>{

    mainContentArea.innerHTML = ''
    const table = document.createElement('table');
    const tableheader = document.createElement('thead');
    const header = tableheader.insertRow();
    header.insertCell(0).innerText = 'S NO';
    header.insertCell(1).innerText = 'Grade';
    header.insertCell(2).innerText = 'Points';
    const tableBody = document.createElement('tbody');
    
    grade_points.map(item =>{
       const row = tableBody.insertRow();
        row.insertCell(0).innerText = item.rank;
        row.insertCell(1).innerText = item.grade;
        row.insertCell(2).innerText = item.points;
    })
    table.appendChild(tableheader)
    table.appendChild(tableBody);
    mainContentArea.appendChild(table);

 }

 const button3 = document.getElementById('content4')
 console.log(button3);

 button3.addEventListener('click' ,() =>{

    fetch('./pointTable.json')
    .then((res) => res.json())
        .then(renderPointTable)
            .catch(() =>{console.log("Masla hai")})

 })

//  function to handle when button1 is clicked
const content1 = document.querySelector('.Content1')
const content2 = document.querySelector('.Content2')

const button1 = document.getElementById('content1')
button1.addEventListener('click' , () =>
{
    mainContentArea.replaceChildren(content1)
}
)

const button2 = document.getElementById('content2')
button2.addEventListener('click', () =>{
    mainContentArea.replaceChildren(content2)
})

const addcourse = document.getElementById('AddCourseButton')
const addSemester = document.getElementById('AddSemesterButton')
const submitCourse = document.getElementById('Submitbutton1')
const SubmitSemester = document.getElementById('Submitbutton2')

addcourse.addEventListener('click' ,addRow)
addSemester.addEventListener('click',addSemesterRecord)
submitCourse.addEventListener('click',calculateSGPA)
SubmitSemester.addEventListener('click',calculateCGPA)