import React, {useState, useEffect} from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/files";

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const res = await axios.get(`${API_URL}/all`);
            setUploadedFiles(res.data);
        } catch (err) {
            console.error("Ошибка при загрузке файлов", err);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        console.log(selectedFile)

        try {
            const res = await axios.post(`${API_URL}/upload`, formData);
            await fetchFiles();
            console.log("Upload response:", res.data);
            setUploadedFiles([...uploadedFiles, res.data]);
            setSelectedFile(null);
        } catch (err) {
            console.error("Ошибка загрузки:", err.response || err);
            alert("Не удалось загрузить файл");
        }
    };

    const handleDownload = async (file) => {
        try {
            const res = await axios.get(`${API_URL}/${file.id}`, {responseType: "blob"});
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.originalName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Ошибка скачивания:", err.response || err);
            alert(err.response?.data?.message || "Не удалось загрузить файл");
        }
    };

    return (
        <div style={{padding: "20px", maxWidth: "500px", margin: "0 auto"}}>
            <h2>Загрузка файлов</h2>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload} disabled={!selectedFile}>
                {"Загрузить"}
            </button>

            {uploadedFiles.length > 0 && (
                <>
                    <h3>Загруженные файлы</h3>
                    <ul>
                        {uploadedFiles.map((file) => (
                            <li key={file.id}>
                                {file.originalName} ({Math.round(file.size / 1024)} KB)
                                <button style={{marginLeft: "10px"}} onClick={() => handleDownload(file)}>
                                    Скачать
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default FileUploader;
