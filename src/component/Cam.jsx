import { useEffect, useRef, useState } from "react";
import { tanggalFormat } from "../utils/helper";
import b1 from "../img/b1.png";
import b2 from "../img/b2.png";
import b3 from "../img/b3.png";
import b4 from "../img/b4.png";
import b5 from "../img/b5.png";
import Mode from "./Mode";

const Photobooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const collageRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photoCount, setPhotoCount] = useState(3);
  const [collageReady, setCollageReady] = useState(false);
  const [frameColor, setFrameColor] = useState("#94AFFF");
  const [textColor, setTextColor] = useState("#000000");
  const [isMirrored, setIsMirrored] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [latestPhoto, setLatestPhoto] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [showText, setShowText] = useState(false);
  const [textBaru, setTextBaru] = useState("Photobooth");
  const [selectedStickers, setSelectedStickers] = useState([""]);
  const [borderColor, setBorderColor] = useState(textColor);
  const [tataLetak, setTataLetak] = useState(3);
  const stickers = [
    "",
    "❤️",
    "😊",
    "😘",
    "🎉",
    "🌟",
    "🔥",
    "💕",
    "😍",
    "😁",
    "👌",
    "🎶",
    "😉",
    "😢",
    "😎",
    "🥰",
    "😶",
    "😡",
    "🫣",
    "🫨",
    "🤤",
    "😶‍🌫️",
    "👍",
    "👻",
    "💩",
    "☠️",
    "🥵",
    "💋",
  ];

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => console.error("Gagal mengakses webcam!", error));
    }
  };

  const toggleMirror = () => {
    setIsMirrored(!isMirrored);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");

      if (isMirrored) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (isMirrored) {
        context.setTransform(1, 0, 0, 1, 0, 0);
      }

      const newPhoto = canvas.toDataURL("image/png");
      setLatestPhoto(newPhoto); // Simpan foto terbaru untuk preview
      return newPhoto;
    }
    return null;
  };

  const startPhotoCapture = () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setPhotos([]);
    let capturedPhotos = [];
    let count = 0;

    const takePhotoWithCountdown = (remainingTime) => {
      if (remainingTime > 0) {
        setCountdown(remainingTime);
        setTimeout(() => takePhotoWithCountdown(remainingTime - 1), 1000);
      } else {
        setCountdown(null);
        const newPhoto = capturePhoto();
        if (newPhoto) {
          capturedPhotos = [...capturedPhotos, newPhoto];
          setPhotos([...capturedPhotos]);
        }
        count++;
        if (count < photoCount) {
          setTimeout(() => takePhotoWithCountdown(3), 1000); // Mulai hitungan mundur lagi
        } else {
          setTimeout(() => {
            setPhotos(capturedPhotos);
            setCollageReady(true);
            setIsCapturing(false);
            toggleCamera(); // Matikan kamera setelah semua foto diambil
          }, 1000);
        }
      }
    };

    takePhotoWithCountdown(3); // Mulai hitungan mundur dari 3
  };

  const downloadCollage = () => {
    const collageCanvas = collageRef.current;
    if (collageCanvas) {
      const link = document.createElement("a");
      link.href = collageCanvas.toDataURL("image/png");
      link.download = "@uriadutu_.png";
      link.click();
    }
  };

  const resetCollage = () => {
    setPhotos([]);
    setCollageReady(false);
    setLatestPhoto(null);
  };

  useEffect(() => {
    if (tataLetak == 1) {
      if (collageReady) {
        const collageCanvas = collageRef.current;
        const context = collageCanvas.getContext("2d");

        const paddingRight = 350; // 🔹 Tambahkan padding kanan lebih besar
        const paddingTop = 30;
        const paddingX = 45;
        const paddingY = 30;
        const photoWidth = 300;
        const photoHeight = 250;
        const framePadding = 10;
        const gapX = 30;
        const gapY = 20;
        let bottomPadding = 30;

        const columns = 2;
        const rows = Math.ceil(photoCount / columns);

        // Jika jumlah foto GENAP, beri padding bawah lebih besar
        if (photoCount % 2 === 0) {
          bottomPadding = 100;
        }

        // Sesuaikan ukuran canvas
        collageCanvas.width = paddingX * 2 + columns * photoWidth + gapX;
        collageCanvas.height =
          paddingY + rows * (photoHeight + gapY) - gapY + bottomPadding;

        context.fillStyle = frameColor;
        context.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

        // Gambar foto dalam format 2 kolom
        photos.forEach((photo, index) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            const col = index % columns;
            const row = Math.floor(index / columns);

            const posX = paddingX + col * (photoWidth + gapX);
            const posY = paddingY + row * (photoHeight + gapY);

            // Gambar foto
            context.drawImage(
              img,
              posX,
              posY,
              photoWidth,
              photoHeight - framePadding
            );

            // Tambahkan border jika `showBorder === true`
            if (showBorder) {
              context.strokeStyle = borderColor;
              context.lineWidth = 3;
              context.strokeRect(
                posX,
                posY,
                photoWidth,
                photoHeight - framePadding
              );
            }
          };
        });

        const usedPositions = new Set();

        if (selectedStickers.length > 0) {
          let stikerDitempatkan = 0;
          let attempts = 0;

          while (stikerDitempatkan < photoCount * 2 && attempts < 20) {
            const randomSticker =
              selectedStickers[
                Math.floor(Math.random() * selectedStickers.length)
              ];
            const randomAngle = Math.random() * 60 - 30;
            const randomArea = Math.random();

            let stickerX, stickerY;

            if (randomArea < 0.25) {
              // Bingkai atas
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY = paddingTop / 2;
            } else if (randomArea < 0.5) {
              // Bingkai bawah
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY =
                paddingTop +
                photoCount * (photoHeight + gapY) -
                gapY +
                bottomPadding -
                60;
            } else if (randomArea < 0.75) {
              // Bingkai kiri
              stickerX = 10;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            } else {
              // Bingkai kanan
              stickerX = collageCanvas.width - 50;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            }

            const key = `${stickerX},${stickerY}`;
            if (!usedPositions.has(key)) {
              usedPositions.add(key);

              context.save();
              context.translate(stickerX + 20, stickerY + 20);
              context.rotate((randomAngle * Math.PI) / 180);
              context.font = "45px Arial"; // Ukuran stiker lebih besar
              context.fillText(randomSticker, -20, 15);
              context.restore();

              stikerDitempatkan++;
            }

            attempts++;
          }
        }

        // Tambahkan `textBaru` hanya satu kali
        if (textBaru && showText) {
          context.fillStyle = textColor;
          context.font = "30px cursive";
          context.textAlign = "center";

          let textX, textY, dateX, dateY;

          if (photoCount % 2 !== 0) {
            // Jika jumlah foto GANJIL, letakkan di tengah slot kosong kanan bawah
            const lastRowY =
              paddingY +
              Math.floor(photoCount / columns) * (photoHeight + gapY);
            const emptySlotX = paddingX + photoWidth + gapX;

            // 🔹 Posisi di tengah slot kosong
            textX = emptySlotX + photoWidth / 2;
            textY = lastRowY + photoHeight / 2; // Tengah vertikal
            dateX = textX;
            dateY = textY + 35; // 🔹 Jarak 35px di bawah textBaru agar tetap dekat
          } else {
            // Jika jumlah foto GENAP, letakkan di tengah bawah dengan padding ekstra
            textX = collageCanvas.width / 2;
            textY = collageCanvas.height - 60;
            dateX = textX;
            dateY = textY + 30; // 🔹 Jarak 30px di bawah textBaru
          }

          // Gambar textBaru
          context.fillText(textBaru, textX, textY);

          // Tambahkan tanggal di bawah textBaru
          if (showDate) {
            context.font = "18px cursive";
            context.fillText(
              tanggalFormat(new Date().toISOString().split("T")[0]),
              dateX,
              dateY
            );
          }
        }
      }
    } else if (tataLetak === 2) {
      if (collageReady) {
        const collageCanvas = collageRef.current;
        const context = collageCanvas.getContext("2d");

        const paddingX = 45;
        const paddingRight = 350; // 🔹 Tambahkan padding kanan lebih besar
        const paddingTop = 30;
        const photoWidth = 400; // 🔹 Lebar foto dikurangi agar ada ruang lebih besar untuk teks
        const photoHeight = 300;
        const framePadding = 10;
        const gapY = 15;
        const bottomPadding = 30;

        // 🔹 Lebarkan canvas agar ada lebih banyak ruang di kanan
        collageCanvas.width = photoWidth + paddingX + paddingRight;
        collageCanvas.height =
          paddingTop + photoCount * (photoHeight + gapY) - gapY + bottomPadding;

        context.fillStyle = frameColor;
        context.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

        const usedPositions = new Set(); // Simpan posisi stiker yang sudah dipakai

        // 🔹 Gambar stiker lebih dulu agar z-index lebih rendah
        if (selectedStickers.length > 0) {
          let stikerDitempatkan = 0;
          let attempts = 0;

          while (stikerDitempatkan < photoCount * 2 && attempts < 20) {
            const randomSticker =
              selectedStickers[
                Math.floor(Math.random() * selectedStickers.length)
              ];
            const randomAngle = Math.random() * 60 - 30;
            const randomArea = Math.random();

            let stickerX, stickerY;

            if (randomArea < 0.25) {
              // Bingkai atas
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY = paddingTop / 2;
            } else if (randomArea < 0.5) {
              // Bingkai bawah
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY =
                paddingTop +
                photoCount * (photoHeight + gapY) -
                gapY +
                bottomPadding -
                60;
            } else if (randomArea < 0.75) {
              // Bingkai kiri
              stickerX = 10;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            } else {
              // Bingkai kanan
              stickerX = collageCanvas.width - 50;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            }

            const key = `${stickerX},${stickerY}`;
            if (!usedPositions.has(key)) {
              usedPositions.add(key);

              context.save();
              context.translate(stickerX + 20, stickerY + 20);
              context.rotate((randomAngle * Math.PI) / 180);
              context.font = "45px Arial"; // Ukuran stiker lebih besar
              context.fillText(randomSticker, -20, 15);
              context.restore();

              stikerDitempatkan++;
            }

            attempts++;
          }
        }

        // 🔹 Sekarang gambar foto secara vertikal
        photos.forEach((photo, index) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            const posY =
              paddingTop + index * (photoHeight + gapY) + framePadding;

            // 🔹 Gambar foto di kiri
            context.drawImage(
              img,
              paddingX,
              posY,
              photoWidth,
              photoHeight - framePadding
            );

            // 🔹 Tambahkan border jika `showBorder === true`
            if (showBorder) {
              context.strokeStyle = borderColor;
              context.lineWidth = 3; // Ketebalan border
              context.strokeRect(
                paddingX,
                posY,
                photoWidth,
                photoHeight - framePadding
              );
            }

            // 🔹 Tambahkan tanggal di kanan atas, sejajar dengan foto pertama
            if (showDate && index === 0) {
              context.fillStyle = textColor;
              context.font = "18px cursive";
              context.textAlign = "center";
              context.fillText(
                tanggalFormat(new Date().toISOString().split("T")[0]),
                paddingX + photoWidth + paddingRight / 2, // Geser ke tengah kanan

                collageCanvas.height / 2 + 30
              );
            }
          };
        });

        // 🔹 Tambahkan teks utama hanya satu kali di tengah kanan
        if (textBaru && showText) {
          context.fillStyle = textColor;
          context.font = "30px cursive";
          context.textAlign = "center";
          context.fillText(
            textBaru,
            paddingX + photoWidth + paddingRight / 2, // Pusatkan di kanan
            collageCanvas.height / 2
          );
        }
      }
    } else if (tataLetak === 3) {
      if (collageReady) {
        const collageCanvas = collageRef.current;
        const context = collageCanvas.getContext("2d");

        const paddingX = 45;
        const paddingTop = 30;
        const photoWidth = 650 - 2 * paddingX;
        const photoHeight = 450;
        const framePadding = 10;
        const bottomPadding = 140;
        const gapY = 10;

        collageCanvas.width = 640;
        collageCanvas.height =
          paddingTop + photoCount * (photoHeight + gapY) - gapY + bottomPadding;

        context.fillStyle = frameColor;
        context.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

        const usedPositions = new Set(); // Simpan posisi stiker yang sudah dipakai

        // 🔹 Gambar stiker lebih dulu agar z-index lebih rendah
        if (selectedStickers.length > 0) {
          let stikerDitempatkan = 0;
          let attempts = 0;

          while (stikerDitempatkan < photoCount * 2 && attempts < 20) {
            const randomSticker =
              selectedStickers[
                Math.floor(Math.random() * selectedStickers.length)
              ];
            const randomAngle = Math.random() * 60 - 30;
            const randomArea = Math.random();

            let stickerX, stickerY;

            if (randomArea < 0.25) {
              // Bingkai atas
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY = paddingTop / 2;
            } else if (randomArea < 0.5) {
              // Bingkai bawah
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY =
                paddingTop +
                photoCount * (photoHeight + gapY) -
                gapY +
                bottomPadding -
                60;
            } else if (randomArea < 0.75) {
              // Bingkai kiri
              stickerX = 10;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            } else {
              // Bingkai kanan
              stickerX = collageCanvas.width - 50;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            }

            const key = `${stickerX},${stickerY}`;
            if (!usedPositions.has(key)) {
              usedPositions.add(key);

              context.save();
              context.translate(stickerX + 20, stickerY + 20);
              context.rotate((randomAngle * Math.PI) / 180);
              context.font = "45px Arial"; // Ukuran stiker lebih besar
              context.fillText(randomSticker, -20, 15);
              context.restore();

              stikerDitempatkan++;
            }

            attempts++;
          }
        }

        // 🔹 Sekarang gambar foto setelah stiker
        photos.forEach((photo, index) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            const posY =
              paddingTop + index * (photoHeight + gapY) + framePadding;

            // Gambar foto
            context.drawImage(
              img,
              paddingX,
              posY,
              photoWidth,
              photoHeight - framePadding
            );

            // 🔹 Tambahkan border jika `showBorder === true`
            if (showBorder) {
              context.strokeStyle = borderColor; // Warna border
              context.lineWidth = 3; // Ketebalan border
              context.strokeRect(
                paddingX,
                posY,
                photoWidth,
                photoHeight - framePadding
              );
            }

            // 🔹 Setelah foto, gambar teks agar z-index lebih tinggi
            if (textBaru && showText) {
              context.fillStyle = textColor;
              context.font = "30px cursive";
              context.textAlign = "center";
              context.fillText(
                textBaru,
                collageCanvas.width / 2,
                collageCanvas.height - 70
              );
            }

            if (showDate && index === photos.length - 1) {
              context.fillStyle = textColor;
              context.font = "20px cursive";
              context.textAlign = "center";
              context.fillText(
                tanggalFormat(new Date().toISOString().split("T")[0]),
                collageCanvas.width / 2,
                collageCanvas.height - 40
              );
            }
          };
        });
      }
    } else if (tataLetak === 4) {
      if (collageReady) {
        const collageCanvas = collageRef.current;
        const context = collageCanvas.getContext("2d");

        const paddingX = 45;
        const paddingTop = 100; // Tambahkan ruang untuk teks & tanggal di atas
        const photoWidth = 650 - 2 * paddingX;
        const photoHeight = 450;
        const framePadding = 10;
        const bottomPadding = 30; // Kurangi padding bawah karena teks di atas
        const gapY = 10;

        // 🔹 Ubah ukuran canvas agar teks dan tanggal di atas mendapatkan ruang
        collageCanvas.width = 640;
        collageCanvas.height =
          paddingTop + photoCount * (photoHeight + gapY) - gapY + bottomPadding;

        context.fillStyle = frameColor;
        context.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

        const usedPositions = new Set(); // Simpan posisi stiker yang sudah dipakai

        // 🔹 Gambar stiker lebih dulu agar z-index lebih rendah
        if (selectedStickers.length > 0) {
          let stikerDitempatkan = 0;
          let attempts = 0;

          while (stikerDitempatkan < photoCount * 2 && attempts < 20) {
            const randomSticker =
              selectedStickers[
                Math.floor(Math.random() * selectedStickers.length)
              ];
            const randomAngle = Math.random() * 60 - 30;
            const randomArea = Math.random();

            let stickerX, stickerY;

            if (randomArea < 0.25) {
              // Bingkai atas
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY = paddingTop / 2;
            } else if (randomArea < 0.5) {
              // Bingkai bawah
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY =
                paddingTop +
                photoCount * (photoHeight + gapY) -
                gapY +
                bottomPadding -
                60;
            } else if (randomArea < 0.75) {
              // Bingkai kiri
              stickerX = 10;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            } else {
              // Bingkai kanan
              stickerX = collageCanvas.width - 50;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            }

            const key = `${stickerX},${stickerY}`;
            if (!usedPositions.has(key)) {
              usedPositions.add(key);

              context.save();
              context.translate(stickerX + 20, stickerY + 20);
              context.rotate((randomAngle * Math.PI) / 180);
              context.font = "45px Arial"; // Ukuran stiker lebih besar
              context.fillText(randomSticker, -20, 15);
              context.restore();

              stikerDitempatkan++;
            }

            attempts++;
          }
        }

        // 🔹 Tambahkan teks utama di bagian atas
        if (textBaru && showText) {
          context.fillStyle = textColor;
          context.font = "30px cursive";
          context.textAlign = "center";
          context.fillText(textBaru, collageCanvas.width / 2, 50); // Posisi teks lebih tinggi
        }

        // 🔹 Tambahkan tanggal di bagian atas
        if (showDate) {
          context.fillStyle = textColor;
          context.font = "20px cursive";
          context.textAlign = "center";
          context.fillText(
            tanggalFormat(new Date().toISOString().split("T")[0]),
            collageCanvas.width / 2,
            80 // Posisikan di bawah teks utama
          );
        }

        // 🔹 Sekarang gambar foto setelah teks di atasnya
        photos.forEach((photo, index) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            const posY =
              paddingTop + index * (photoHeight + gapY) + framePadding;

            // Gambar foto
            context.drawImage(
              img,
              paddingX,
              posY,
              photoWidth,
              photoHeight - framePadding
            );

            // 🔹 Tambahkan border jika `showBorder === true`
            if (showBorder) {
              context.strokeStyle = borderColor; // Warna border
              context.lineWidth = 3; // Ketebalan border
              context.strokeRect(
                paddingX,
                posY,
                photoWidth,
                photoHeight - framePadding
              );
            }
          };
        });
      }
    } else if (tataLetak === 5) {
      if (collageReady) {
        const collageCanvas = collageRef.current;
        const context = collageCanvas.getContext("2d");

        const paddingLeft = 350; // 🔹 Perbesar padding kiri untuk teks
        const paddingX = 45;
        const paddingTop = 30;
        const photoWidth = 400;
        const photoHeight = 300;
        const framePadding = 10;
        const gapY = 15;
        const bottomPadding = 30;

        // 🔹 Lebarkan canvas agar teks di kiri punya lebih banyak ruang
        collageCanvas.width = paddingLeft + photoWidth + paddingX;
        collageCanvas.height =
          paddingTop + photoCount * (photoHeight + gapY) - gapY + bottomPadding;

        context.fillStyle = frameColor;
        context.fillRect(0, 0, collageCanvas.width, collageCanvas.height);

        const usedPositions = new Set(); // Simpan posisi stiker yang sudah dipakai

        // 🔹 Gambar stiker lebih dulu agar z-index lebih rendah
        if (selectedStickers.length > 0) {
          let stikerDitempatkan = 0;
          let attempts = 0;

          while (stikerDitempatkan < photoCount * 2 && attempts < 20) {
            const randomSticker =
              selectedStickers[
                Math.floor(Math.random() * selectedStickers.length)
              ];
            const randomAngle = Math.random() * 60 - 30;
            const randomArea = Math.random();

            let stickerX, stickerY;

            if (randomArea < 0.25) {
              // Bingkai atas
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY = paddingTop / 2;
            } else if (randomArea < 0.5) {
              // Bingkai bawah
              stickerX = Math.random() * (collageCanvas.width - 60);
              stickerY =
                paddingTop +
                photoCount * (photoHeight + gapY) -
                gapY +
                bottomPadding -
                60;
            } else if (randomArea < 0.75) {
              // Bingkai kiri
              stickerX = 10;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            } else {
              // Bingkai kanan
              stickerX = collageCanvas.width - 50;
              stickerY =
                paddingTop +
                Math.random() *
                  (photoCount * (photoHeight + gapY) - gapY + bottomPadding);
            }

            const key = `${stickerX},${stickerY}`;
            if (!usedPositions.has(key)) {
              usedPositions.add(key);

              context.save();
              context.translate(stickerX + 20, stickerY + 20);
              context.rotate((randomAngle * Math.PI) / 180);
              context.font = "45px Arial"; // Ukuran stiker lebih besar
              context.fillText(randomSticker, -20, 15);
              context.restore();

              stikerDitempatkan++;
            }

            attempts++;
          }
        }

        // 🔹 Sekarang gambar foto secara vertikal di kanan
        photos.forEach((photo, index) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            const posY =
              paddingTop + index * (photoHeight + gapY) + framePadding;

            // 🔹 Gambar foto di kanan
            context.drawImage(
              img,
              paddingLeft, // 🔹 Foto dipindahkan ke kanan
              posY,
              photoWidth,
              photoHeight - framePadding
            );

            // 🔹 Tambahkan border jika `showBorder === true`
            if (showBorder) {
              context.strokeStyle = borderColor;
              context.lineWidth = 3;
              context.strokeRect(
                paddingLeft,
                posY,
                photoWidth,
                photoHeight - framePadding
              );
            }

            // 🔹 Tambahkan tanggal di kiri atas, sejajar dengan foto pertama
            if (showDate && index === 0) {
              context.fillStyle = textColor;
              context.font = "18px cursive";
              context.textAlign = "center";
              context.fillText(
                tanggalFormat(new Date().toISOString().split("T")[0]),
                paddingLeft / 2, // 🔹 Geser ke kiri
                collageCanvas.height / 2 + 30
              );
            }
          };
        });

        // 🔹 Tambahkan teks utama hanya satu kali di tengah kiri
        if (textBaru && showText) {
          context.fillStyle = textColor;
          context.font = "30px cursive";
          context.textAlign = "center";
          context.fillText(
            textBaru,
            paddingLeft / 2, // 🔹 Teks berada di tengah kiri
            collageCanvas.height / 2
          );
        }
      }
    } else {
      console.log("tata letak 0");
    }
  }, [
    collageReady,
    frameColor,
    textColor,
    borderColor,
    textBaru,
    showDate,
    showText,
    selectedStickers,
    showBorder,
    tataLetak,
  ]);

  return (
    <div
      className={`flex flex-col items-center min-h-screen dark:bg-gray-900 dark:text-white transition-colors duration-300`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Photobooth</h1>

      {!collageReady && (
        <div className="relative">
          <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-gray-100 relative">
            <video
              ref={videoRef}
              className={`w-[640px] h-[480px] rounded-md border-2 border-gray-300 ${
                isMirrored ? "scale-x-[-1]" : ""
              }`}
              autoPlay
            ></video>
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 text-gray-900 text-6xl font-bold">
                {countdown}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 w-full justify-center mt-5 items-center">
            <button
              onClick={toggleCamera}
              className={`px-4 py-2 font-bold rounded shadow-md transition ${
                stream
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {stream ? "Matikan Kamera" : "Aktifkan Kamera"}
            </button>
            <div className="flex items-center gap-4">
              Butuh Cahaya?
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-4 py-2 rounded shadow-md border bg-gray-200 dark:bg-gray-700 dark:text-white"
              >
                {isDarkMode ? "YA" : "TIDAK"}
              </button>
            </div>
            {stream && (
              <button
                onClick={toggleMirror}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-3 transition"
              >
                {isMirrored ? "Normal" : "Mirror"}
              </button>
            )}
          </div>
          {latestPhoto && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">Preview Foto Terbaru</p>
              <img
                src={latestPhoto}
                alt="Foto Terbaru"
                className="w-40 h-40 object-cover border-2 border-yellow-400 rounded-md mx-auto"
              />
            </div>
          )}
        </div>
      )}

      {!collageReady && (
        <div className="mt-6 flex flex-col items-center">
          <label className="mb-2 text-lg text-gray-700">Jumlah Foto:</label>
          <input
            type="number"
            min="1"
            value={photoCount}
            onChange={(e) => setPhotoCount(Number(e.target.value))}
            className="px-4 py-2 rounded border border-gray-400 bg-gray-100 text-gray-900 w-20 text-center"
          />
          {stream && (
            <button
              onClick={startPhotoCapture}
              className={`bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-3 mt-4 transition ${
                isCapturing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isCapturing}
            >
              {isCapturing ? "Mengambil Foto..." : "Ambil Foto"}
            </button>
          )}
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="hidden"
        width="640"
        height="480"
      ></canvas>

      {collageReady && (
        <>
          <div className="flex gap-10 mt-10">
            <div>
              <p className="text-xl font-bold text-gray-800">Preview</p>
              <canvas
                ref={collageRef}
                className="w-[350px] mt-6 border border-gray-300 shadow-md rounded-lg"
              ></canvas>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">Pengaturan</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <label className="text-gray-700">Atur Warna Bingkai</label>
                <input
                  type="color"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                  className="w-16 h-10 border border-gray-400 rounded-md bg-gray-100 cursor-pointer"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-gray-700">Atur Warna Text</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10 border border-gray-400 rounded-md bg-gray-100 cursor-pointer"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-gray-700">Pilih Stiker</label>
                <select
                  multiple
                  className="p-2 bg-gray-100 border border-gray-400 rounded-md text-gray-900"
                  onChange={(e) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setSelectedStickers(selected);
                  }}
                  value={selectedStickers}
                >
                  {stickers.map((sticker, idx) => (
                    <option key={idx} value={sticker}>
                      {sticker}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="showDate"
                  className="w-4 h-4"
                  checked={showDate}
                  onChange={() => setShowDate(!showDate)}
                />
                <label htmlFor="showDate" className="ml-2 text-gray-700">
                  Tampilkan Tanggal
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="showText"
                  className="w-4 h-4"
                  checked={showText}
                  onChange={() => setShowText(!showText)}
                />
                <label htmlFor="showText" className="ml-2 text-gray-700">
                  Tampilkan Text
                </label>
              </div>
              {showText && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="text-gray-700">Atur Text</label>
                  <input
                    type="text"
                    placeholder="PhotoBooth"
                    value={textBaru}
                    onChange={(e) => setTextBaru(e.target.value)}
                    className="border border-gray-400 rounded-md bg-gray-100 p-2"
                  />
                </div>
              )}
              <p className="mt-4 text-gray-700">Pilih Tata Letak</p>
              <div className="flex gap-3 p-2">
                {[b1, b2, b3, b4, b5].map((layout, index) => (
                  <button key={index} onClick={() => setTataLetak(index + 1)}>
                    <img
                      className="h-20 w-auto object-contain border border-gray-300 rounded-lg"
                      src={layout}
                      alt=""
                    />
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={downloadCollage}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-3 transition"
                >
                  Download Hasil Foto
                </button>
                <button
                  onClick={resetCollage}
                  className="bg-gray-400 hover:bg-gray-500 text-white rounded py-2 px-3 transition"
                >
                  Ambil Ulang
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Photobooth;
