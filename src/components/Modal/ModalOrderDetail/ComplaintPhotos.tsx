import React, { FC } from 'react';

const ComplaintPhotos:FC<any> = ({ order }) => {
  const openInNewTab = (url:string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <>
      <p className="fw-bold mb-3 fs-5">
        Foto Komplain:
        <small className="text-secondary"> (klik gambar untuk buka di tab baru)</small>
      </p>
      <div className="d-flex gap-2 mb-3">
        {order?.complaint?.complaint_photos.map((photo:any) => (
          <div
            key={photo.id}
            className="order_item_image border rounded hover-click"
            role="presentation"
            onClick={() => openInNewTab(photo.photo_url)}
          >
            <img src={photo.photo_url} alt="foto komplain" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ComplaintPhotos;
