import { Mail, Phone } from "lucide-react";

export const Personil = ({ data }) => {
  return data?.Head_of_Study_Program == null || data?.Study_Program_Secretary.id == null ? (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      Informasi Ketua Program Studi dan Sekretaris Program Studi belum tersedia.
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Informasi Ketua Program Studi */}
      <div
        key={data.Head_of_Study_Program.id}
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={`https://fst-dashboard.up.railway.app${data.Head_of_Study_Program.lecture.Foto.url}`}
            alt={data.Head_of_Study_Program.lecture.name}
            className="object-cover object-top w-full h-full transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="relative p-6">
          {/* Position Badge */}
          <div className="absolute -top-5 left-6 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {data.Head_of_Study_Program.Section}
          </div>

          {/* Content */}
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.Head_of_Study_Program.lecture.Name}</h3>
            <p className="text-gray-600 mb-4">NIP. {data.Head_of_Study_Program.lecture.NIP}</p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">email@example.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+62 xxx-xxxx-xxxx</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Sekretaris Program Studi */}
      <div
        key={data.Study_Program_Secretary.id}
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={`https://fst-dashboard.up.railway.app${data.Study_Program_Secretary.lecture.Foto.url}`}
            alt={data.Study_Program_Secretary.lecture.name}
            className="object-cover object-top w-full h-full transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="relative p-6">
          {/* Position Badge */}
          <div className="absolute -top-5 left-6 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {data.Study_Program_Secretary.Section}
          </div>

          {/* Content */}
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.Study_Program_Secretary.lecture.Name}</h3>
            <p className="text-gray-600 mb-4">NIP. {data.Study_Program_Secretary.lecture.NIP}</p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">email@example.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+62 xxx-xxxx-xxxx</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personil;

