"use client";
import { useState } from "react";

type CheckedItems = {
  makanan: string[];
  pakaian: string[];
  barangLain: string[];
};

type WajibItems = {
  makanan: string[];
  pakaian: string[];
  barangLain: string[];
};

// Daftar item yang akan ditampilkan di UI
const uiItems = [
  {
    kategori: "makanan",
    items: [
      "Ultra Mimikids",
      "Roti Sobek",
      "Makaroni Dua Kelinci",
      "Nasi Goreng Kecap + Tahu Tempe",
      "Better",
      "Air Matang 1,5L",
      "Air Mentah 1,5L",
    ],
  },
  {
    kategori: "pakaian",
    items: [
      "Kemeja putih Polos Panjang",
      "Celana Kain Hitam",
      "Kaos Kaki Hitam Sampai Mata Kaki",
      "Slayer",
      "Name Tag",
      "Ikat Pinggang",
      "Topi",
      "Jam Tangan",
    ],
  },
  {
    kategori: "barangLain",
    items: [
      "Kunci kost/rumah",
      "Charger",
      "Kunci Kendaraan",
      "Plastik Ukuran Sedang",
      "Sendal",
      "Pulpen",
    ],
  },
];

// Daftar item wajib
const wajibItems: WajibItems = {
  makanan: [
    "Ultra Mimikids",
    "Roti Sobek",
    "Makaroni Dua Kelinci",
    "Nasi Goreng Kecap + Tahu Tempe",
    "Better",
    "Air Matang 1,5L",
    "Air Mentah 1,5L",
  ],
  pakaian: [
    "Kemeja putih Polos Panjang",
    "Celana Kain Hitam",
    "Kaos Kaki Hitam Sampai Mata Kaki",
    "Slayer",
    "Name Tag",
    "Ikat Pinggang",
    "Topi",
  ],
  barangLain: ["Plastik Ukuran Sedang", "Sendal", "Pulpen"],
};

const forbiddenItems: string[] = [
  "Minuman Alkohol",
  "Obat-obatan Terlarang",
  "Jam Tangan",
  "Kunci Kendaraan",
  "Charger",
];

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    makanan: [],
    pakaian: [],
    barangLain: [],
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [totalWajibItems, setTotalWajibItems] = useState<number>(0); // State untuk total wajib items

  // Menghitung total item wajib saat komponen dimuat
  const calculateTotalWajibItems = () => {
    const total =
      wajibItems.makanan.length +
      wajibItems.pakaian.length +
      wajibItems.barangLain.length;
    setTotalWajibItems(total);
  };

  // Hitung total item wajib saat komponen dimuat
  useState(() => {
    calculateTotalWajibItems();
  }, []);

  const handleItemCheck = (category: keyof CheckedItems, item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const checkForbiddenItems = () => {
    const selectedItems = [
      ...checkedItems.makanan,
      ...checkedItems.pakaian,
      ...checkedItems.barangLain,
    ];
    const forbiddenSelected = selectedItems.filter((item) =>
      forbiddenItems.includes(item)
    );
    setErrors(forbiddenSelected);

    // Hitung item wajib yang sudah terpilih
    const selectedWajibItems = [
      ...checkedItems.makanan.filter((item) =>
        wajibItems.makanan.includes(item)
      ),
      ...checkedItems.pakaian.filter((item) =>
        wajibItems.pakaian.includes(item)
      ),
      ...checkedItems.barangLain.filter((item) =>
        wajibItems.barangLain.includes(item)
      ),
    ].length;

    const completion = (selectedWajibItems / totalWajibItems) * 100; // Menggunakan totalWajibItems dari state
    setCompletionPercentage(completion);
  };

  return (
    <div className="mx-3 my-3">
      <div className="w-full max-w-md mx-auto mt-5 p-5 ">
        <h1 className="font-bold text-3xl text-center">
          Selamat datang para Baratheon
        </h1>
        <p className="mt-4 text-center text-lg">
          <p className="mt-4 text-center text-lg">
            What's up, Baratheon Squad! 🌟🔥 Selamat datang buat akang-akang dan
            teteh-teteh kece badai! ✨🤩 Kita ini <strong>Baratheon</strong>,
            keluarga besar yang solid dan unstoppable! 💪👑 Di sini, kita gas
            terus bareng-bareng buat bantuin sesama, biar nggak ada yang kena
            hukuman atau tersandung masalah.{" "}
            <strong>Teamwork makes the dream work</strong>, bro-sis, karena cuma
            bareng kita bisa pecahkan tantangan apapun! 🙌
            <br />
            <br />
            Ingat, kita bukan cuma kerja keras, tapi juga kerja cerdas. Kalau
            kita kompak, hukumannya lewat aja deh! 😉 Jadi, siap-siap kasih yang
            terbaik dan bikin Baratheon terus berkibar! 🏆
            <br />
            <br />
            Let’s get this bread, Baratheon! 🚀🔥
          </p>
          <p className="mt-4 text-center text-lg">
            Buat kamu yang punya kebiasaan bawa barang yang tidak boleh
            digunakan di gamatif, cek lagi dan lihat juga di list cek barang
            bawaan! Jika ada barang seperti jam tangan, mohon untuk tidak dibawa
            dan bawa sesuai list. Nah, untuk presentase 100% hanya dilihat dari
            barang wajib, jadi meskipun sudah 100% cek dulu ya, ada beberapa
            barang yang dilarang yang tidak boleh dibawa. 😎
          </p>
        </p>
      </div>

      {/* Form Auto Check Items */}
      <div className="w-full max-w-md mx-auto mt-5 p-5">
        <h2 className="font-semibold text-2xl text-center">
          Auto Cek Barang Bawaan
        </h2>

        {uiItems.map(({ kategori, items }) => (
          <div key={kategori}>
            <h3 className="font-semibold text-xl mt-4">
              {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
            </h3>
            {items.map((item) => (
              <div key={item} className="mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checkedItems[
                      kategori as keyof CheckedItems
                    ].includes(item)}
                    onChange={() =>
                      handleItemCheck(kategori as keyof CheckedItems, item)
                    }
                  />
                  <span>{item}</span>
                </label>
              </div>
            ))}
          </div>
        ))}

        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
          onClick={checkForbiddenItems}
        >
          Cek Barang
        </button>

        {/* Display forbidden items in red */}
        {errors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-red-600 font-bold">
              Barang yang Tidak Boleh Dibawa:
            </h3>
            <ul className="list-disc list-inside text-red-600">
              {errors.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Display completion percentage */}
        {completionPercentage > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">
              Barang Wajib yang Sudah Dibawa: {completionPercentage.toFixed(2)}%
            </h3>
            {completionPercentage < 100 && (
              <p className="text-red-600">
                Anda masih kurang{" "}
                {Math.ceil(
                  ((100 - completionPercentage) / 100) * totalWajibItems
                )}{" "}
                item!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
