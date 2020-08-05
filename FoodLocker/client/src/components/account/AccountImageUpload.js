import React, { useState } from "react"
import { Typography, TextField, Grid } from "@material-ui/core"

export default ({ setImageUrl }) => {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'foodLocker')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dxcf8k91m/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
        setImageUrl(file.secure_url)
    }

    return (
        <Grid container>
            <div className="imageUpload">
                <Typography>Upload Image</Typography>
                <TextField
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                />
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                        <img src={image} alt="avatar" style={{ width: '300px' }} />
                    )}
            </div>
        </Grid>
    )
}