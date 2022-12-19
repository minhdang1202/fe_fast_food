import React, { useState } from "react";

const Images = ({ previewImage, setPreviewImage }) => {
  const handleInputFile = (e) => {
    const file = e.target.files[0];
    previewImg(file);
  };

  const previewImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage([...previewImage, reader.result]);
    };
  };

  const removeImage = (img) => {
    const imgs = previewImage.filter((image) => image !== img);
    setPreviewImage(imgs);
  };

  return (
    <div className="listImgs">
      <label
        className="btn btn-white btn-hover-text-primary"
        data-action="change"
        data-toggle="tooltip"
        data-original-title="Change avatar"
      >
        <div className="btn btn-primary">Thêm ảnh</div>
        <input
          type="file"
          name="image"
          onChange={handleInputFile}
          className="inputAvatar"
        />
      </label>

      <div className="list-image col-xl-9 col-lg-8">
        {previewImage?.map((img, i) => (
          <div key={i} className="box-preview">
            <img
              src={img}
              alt="image1"
              className="image-input image-input-outline img-product"
            />
            <div className="image-product-wrapper" />
            <i className="fas fa-times" onClick={() => removeImage(img)}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
