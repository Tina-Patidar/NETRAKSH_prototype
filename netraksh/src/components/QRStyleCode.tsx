interface QRStyleCodeProps {
  value: string;
  size?: number;
}

function hashChar(str: string, i: number): number {
  let h = 0;
  for (let k = 0; k < str.length; k++) {
    h = (h * 31 + str.charCodeAt(k) + i * 7) | 0;
  }
  return Math.abs(h);
}

export default function QRStyleCode({ value, size = 140 }: QRStyleCodeProps) {
  const grid = 11;
  const cell = size / grid;
  const cells: boolean[] = [];
  for (let i = 0; i < grid * grid; i++) {
    cells.push(hashChar(value, i) % 5 < 2);
  }

  function isFinder(r: number, c: number) {
    const zones = [
      [0, 0],
      [0, grid - 7],
      [grid - 7, 0],
    ];
    return zones.some(([zr, zc]) => r >= zr && r < zr + 7 && c >= zc && c < zc + 7);
  }

  return (
    <svg width={size} height={size} className="rounded-lg bg-white p-1.5">
      {Array.from({ length: grid }).map((_, r) =>
        Array.from({ length: grid }).map((__, c) => {
          const idx = r * grid + c;
          const finder = isFinder(r, c);
          let fill = '#fff';
          if (finder) {
            const zones = [
              [0, 0],
              [0, grid - 7],
              [grid - 7, 0],
            ];
            const zone = zones.find(([zr, zc]) => r >= zr && r < zr + 7 && c >= zc && c < zc + 7)!;
            const lr = r - zone[0];
            const lc = c - zone[1];
            const isBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
            const isCore = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
            fill = isBorder || isCore ? '#0A1120' : '#fff';
          } else if (cells[idx]) {
            fill = '#0A1120';
          }
          return <rect key={idx} x={c * cell} y={r * cell} width={cell} height={cell} fill={fill} />;
        })
      )}
    </svg>
  );
}
