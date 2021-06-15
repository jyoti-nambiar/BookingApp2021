import React, { useState } from 'react'
import axios from 'axios';


function UploadFile() {
    const [fileData, setfileData] = useState([]);


    function handleOnChange(e) {

        console.log(e.target.files);
        setfileData(e.target.files[0])
    }





    async function fileUpload(e) {
        e.preventDefault();
        console.log(fileData);
        const data = new FormData();

        data.append("files", fileData);


        const response = await axios.post("http://localhost:1337/upload", data
        );
        console.log(response);




    }







    return (
        <div>
            <form onSubmit={fileUpload}>

                <input type="file" name="file" onChange={handleOnChange} />

                <button >submit</button>
            </form>
        </div>
    )
}

export default UploadFile
