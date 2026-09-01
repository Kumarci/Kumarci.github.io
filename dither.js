// ===== Efek Dither Animasi (Bayer / grayscale hitam-putih) =====
// Implementasi vanilla dari konsep DitherShader React

(function () {
    const canvas = document.getElementById('dither');
    if (!canvas) return;

    // Ukuran canvas resolve (mengikuti atribut width/height canvas navbar)
    const SIZE = canvas.width || 40;
    const GRID = 2;                // gridSize
    const SPEED = 0.02;            // animationSpeed

    // Pilihan warna (sama seperti kode React: #000000 & #f5f5f5)
    const PRIMARY = [0, 0, 0];
    const SECONDARY = [245, 245, 245];

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'dhenzain1.jpg';

    // Matriks Bayer 4x4 untuk pola titik dithering
    const bayer4 = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
    ];
    const MAX_VAL = 16;

    // Siapkan pixel buffer gambar di resolusi kecil
    let srcData = null;
    let srcW = 0, srcH = 0;
    let t = 0;

    function getBayer(x, y) {
        return bayer4[y % 4][x % 4] / MAX_VAL;
    }

    img.onload = () => {
        // Sampel gambar menjadi array warna pada resolusi grid
        const cell = GRID;
        srcW = Math.floor(SIZE / cell);
        srcH = Math.floor(SIZE / cell);
        const off = document.createElement('canvas');
        off.width = srcW;
        off.height = srcH;
        const octx = off.getContext('2d');
        octx.drawImage(img, 0, 0, srcW, srcH);
        srcData = octx.getImageData(0, 0, srcW, srcH).data;
        requestAnimationFrame(render);
    };

    function render() {
        if (!srcData) { requestAnimationFrame(render); return; }

        t += SPEED;

        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, SIZE, SIZE);

        const cell = GRID;
        // Threshold animasi: pergeseran halus sesuai waktu
        const wave = 0.5 + 0.5 * Math.sin(t * 2);

        for (let gy = 0; gy < srcH; gy++) {
            for (let gx = 0; gx < srcW; gx++) {
                const idx = (gy * srcW + gx) * 4;
                // Grayscale (luminance)
                const lum = 0.299 * srcData[idx] + 0.587 * srcData[idx + 1] + 0.114 * srcData[idx + 2];
                const g = lum / 255;

                // Bayer threshold + animasi (pergeseran threshold schema)
                const b = getBayer(gx, gy);
                // animasi: threshold bergerak sinusoidal
                const threshold = (256 * b) / 255 * 0.5 + wave * 0.18;

                let color;
                if (g > threshold) {
                    color = SECONDARY;
                } else {
                    color = PRIMARY;
                }

                ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
                ctx.fillRect(gx * cell, gy * cell, cell, cell);
            }
        }

        requestAnimationFrame(render);
    }

    // Fallback kalau gambar gagal dimuat
    img.onerror = () => {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, SIZE, SIZE);
    };
})();
