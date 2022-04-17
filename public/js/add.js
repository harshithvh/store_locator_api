// Send data to server obtained from add.html

const storeForm = document.getElementById('store-form')
const storeId = document.getElementById('store-id')
const storeAddress = document.getElementById('store-address')

// Send POST to server to add store in Database
async function addStore(e) {
    e.preventDefault()

    if(storeId.value === '' || storeAddress.value === '') {
        alert('Please fill in the fields')
    }

    const sendBody = {
        storeId: storeId.value,
        address: storeAddress.value
    }

    try{
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        })

        if(res.status === 400) {
            throw Error('Store already exists!')
        }

        alert('Store added!')

        window.location.href = '/index.html' // redirect to index.html

    } catch (err) {
        alert(err) // In case of 400 error above the catch will be invoked and an alert of 'Store already exists' is sent
        return
    }

}

storeForm.addEventListener('submit', addStore)