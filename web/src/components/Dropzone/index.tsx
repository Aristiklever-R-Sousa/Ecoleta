import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import './styles.css';
import { FiUpload } from 'react-icons/fi';

interface Props {
	onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
	const [ selectedImage, setSelectedImage ] = useState('');

	const onDrop = useCallback(acceptedFiles => {
		// accptedFiles contém o(s) arquivo(s) enviado pelo user
		// como nesse caso é apenas uma imagem, ela está na posição 0
		const file = acceptedFiles[0];

		// O URL.createObjectURL serve para criar uma URL no JS
		const fileUrl = URL.createObjectURL(file);

		setSelectedImage(fileUrl);

		onFileUploaded(file);
  	}, [onFileUploaded]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: 'image/*'
    });

	return (
		<div className="dropzone" {...getRootProps()}>
		<input {...getInputProps()} accept="image/*" />

		{ selectedImage
		  ? <img src={selectedImage} alt="Point thumbnail" />
		  : (
				<p>
					<FiUpload />
					Coloque a imagem do estabelecimento aqui!
				</p>
		  )
			
			/**isDragActive ?
					<p>Essa imagem?</p> 
				:
					<p>
						<FiUpload />
						Coloque a imagem do estabelecimento aqui!
					</p>
			*/
		}
		</div>
	)
}

export default Dropzone;