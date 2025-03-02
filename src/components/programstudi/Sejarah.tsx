const Sejarah = ({ data }) => {
  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Sejarah</h3>
      {data?.History == null ? (
        <p className="text-sm text-gray-600">
          Informasi History belum tersedia.
        </p>
      ) : (
        <p className="text-gray-600 leading-relaxed">{data.History.Text}</p>
      )}
    </>
  );
};

export default Sejarah;
