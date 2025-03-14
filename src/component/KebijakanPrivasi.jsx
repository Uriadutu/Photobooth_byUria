import React from "react";

const KebijakanPrivasi = () => {
  return (
    <div className="min-h-screen pt-20 text-gray-900 px-6 sm:px-8 md:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Judul */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-6 text-center sm:text-left">
          Kebijakan Privasi
        </h1>
        <p className="text-gray-600 mb-6 text-center sm:text-left">
          Terakhir diperbarui: <span className="font-semibold">14 Maret 2025</span>
        </p>

        {/* Konten Kebijakan Privasi */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
          <p>
            Kami di <span className="font-semibold">Photobooth</span> menghormati dan melindungi privasi pengguna.
            Aplikasi ini dirancang untuk digunakan tanpa mengumpulkan atau menyimpan informasi pribadi Anda.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">1. Informasi yang Kami Kumpulkan</h2>
          <p>
            **Photobooth tidak mengumpulkan, menyimpan, atau membagikan informasi pribadi pengguna.**
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">2. Pengelolaan Foto</h2>
          <p>
            Foto yang Anda ambil di aplikasi ini **tidak disimpan di server kami** dan hanya tersimpan 
            sementara di perangkat Anda. Kami tidak memiliki akses ke foto tersebut.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">3. Keamanan Pengguna</h2>
          <p>
            Karena kami tidak mengumpulkan data pengguna, tidak ada informasi yang dapat disalahgunakan. 
            Kami memastikan bahwa aplikasi ini tetap aman dan bebas dari pelacakan.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">4. Perubahan Kebijakan</h2>
          <p>
            Jika ada perubahan dalam kebijakan ini, kami akan memperbaruinya di halaman ini. 
            Kami tetap berkomitmen untuk menjaga privasi pengguna.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">5. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, Anda dapat menghubungi kami melalui{" "}
            <a href="mailto:support@photobooth.com" className="text-blue-500 underline">
              support@photobooth.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KebijakanPrivasi;
