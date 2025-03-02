"use client";

const Fasilitas = ({ data }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Fasilitas Prodi</h3>
      {data.Facilities == null ? (
        <p className="text-sm text-gray-600">Informasi Fasilitas belum tersedia.</p>
      ) : (
        <p className="text-gray-600 leading-relaxed">{data.Facilities.Description}</p>
      )}
    </div>
  );
};

export default Fasilitas;

