console.log("Postman");

// Utility function
// 1. To get element from string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild
}


//Hide param box initially
let paramsbox = document.getElementById('paramsbox')
paramsbox.style.display = 'none'
let jsonbox = document.getElementById('jsonbox')


//if clicks on params then hide JSon box
let paramsRadio = document.getElementById('params')
paramsRadio.addEventListener('click', () => {
    jsonbox.style.display = 'none'
    paramsbox.style.display = ''
})

let jsonRadio = document.getElementById('json')
jsonRadio.addEventListener('click', () => {
    jsonbox.style.display = ''
    paramsbox.style.display = 'none'
})


//Initialize params count
let addedParamsCount = 0;

// if user clicks on +
let addParams = document.getElementById('addParams')
addParams.addEventListener('click', () => {
    let newParams = document.getElementById('newParams')
    let str = ` <div class="row my-2">
                    <label class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                    <div class="col">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} KEY">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} VALUE">
                    </div>
                    <button class="btn btn-primary delParam">-</button>
                </div>   `

    //convert element string to Dom node
    let paramElement = getElementFromString(str)
    // console.log(paramElement);
    newParams.appendChild(paramElement)

    //delete params
    let delParam = document.getElementsByClassName('delParam')
    for (x of delParam) {
        x.addEventListener('click', (e) => {
            var c = confirm('Do you confirm to delete the Parameter ?')
            if (c == true) {
                e.target.parentElement.remove()
            }
        })
    }
    addedParamsCount++;
})

//Submit
let submit = document.getElementById('submit')
submit.addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('resPrism').value = 'Please Wait.. Fetching Response ! '

    //fetch values
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //If user has selected params
    if (contentType == 'PARAMS') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value
                data[key] = value;
            }
        }
        data = JSON.stringify(data)
    }
    else {
        data = document.getElementById('reqJsonTxt').value
    }

    console.log('URL is', url);
    console.log('ReqType is', requestType);
    console.log('ContType is', contentType);
    console.log('Data is', data);


    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('resPrism').innerHTML = text
                Prism.highlightAll()
            })
    }

    else {
        fetch(url, {
            method: 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                  },
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('resPrism').innerHTML = text
                Prism.highlightAll()
            })
    }

})


//GET REQUESTS--
// URL -- https://randomuser.me/api/

// JSON/PARAMS  -- ANT TEXT



//  POST REQUESTS ---
//  URL --  https://jsonplaceholder.typicode.com/posts

//  JSON--
//   {
//     "title": "foo",
//     "body": "bar",
//     "userId": 1
//   }

// PARAMS -- above text as words in key & value e.g.
//     title     foo
//     body      bar
//     userId    1



