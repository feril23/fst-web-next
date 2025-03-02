import { ArrowRight, GraduationCap } from "lucide-react";

const TenagaPengajar = ({ data }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">informasi Tenaga Pengajar</h3>
      {data.length == 0 ? (
        <p className="text-sm text-gray-600">Data Tenaga Pengajar belum tersedia.</p>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((tenagaPengajar, index) => (
            <div
              key={tenagaPengajar.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-teal-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex sm:flex-row md:flex-col lg:flex-row items-start gap-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
                        src={`https://fst-dashboard.up.railway.app${tenagaPengajar.Foto.url}`}
                        alt={`Image Dosen ${tenagaPengajar.Name}`}
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-teal-600 text-white p-2 rounded-lg shadow-lg">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{tenagaPengajar.Name}</h4>

                    {/* Action Button */}
                    <button
                      onClick={() =>
                        window.open(`https://ddt.ar-raniry.ac.id/profil/${tenagaPengajar.DDT_ID}`, "_blank")
                      }
                      className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                    >
                      Lihat Profil
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenagaPengajar;

