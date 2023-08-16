export const hex2rgb = (hex: string[]) => {
    var tempRGB = [];
    switch (hex.length) {
        case 3:
            tempRGB[0] = hex[0] + hex[0];
            tempRGB[1] = hex[1] + hex[1];
            tempRGB[2] = hex[2] + hex[2];
            break;
        case 6:
            tempRGB[0] = hex[0] + hex[1];
            tempRGB[1] = hex[2] + hex[3];
            tempRGB[2] = hex[4] + hex[5];
            break;
    }
    return [
        parseInt(tempRGB[0], 16),
        parseInt(tempRGB[1], 16),
        parseInt(tempRGB[2], 16),
    ];
};

export const rgb2hex = (rgb: number[]) => {
    var tempHEX = '';
    for (let i = 0; i <= 2; i++) {
        let tempHEXchar = rgb[i].toString(16);
        if (tempHEXchar.length < 2) {
            tempHEX = tempHEX + '0' + tempHEXchar;
        } else {
            tempHEX = tempHEX + tempHEXchar;
        }
    }
    return tempHEX;
};

export const rgb2hexWeb = (rgb: number[]) => {
    let tempHEX = '';
    for (let i = 0; i <= 2; i++) {
        tempHEX = tempHEX + ((Math.round(rgb[i] / 51) * 51) / 17).toString(16);
    }
    return tempHEX;
};
export const rgb2rgbWeb = (rgb: number[]) => {
    var tempRGB = [];
    for (let i = 0; i <= 2; i++) {
        tempRGB[i] = Math.round(rgb[i] / 51) * 51;
    }
    return tempRGB;
};

/*
 * CMYK Convert
 * https://www.standardabweichung.de/code/javascript/cmyk-rgb-conversion-javascript
 * https://www.standardabweichung.de/code/javascript/rgb-cmyk-conversion-javascript
 */
export const cmyk2rgb = (cmyk: number[], normalized?: boolean) => {
    let c = cmyk[0] / 100;
    let m = cmyk[1] / 100;
    let y = cmyk[2] / 100;
    let k = cmyk[3] / 100;

    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;

    var r = 1 - c;
    var g = 1 - m;
    var b = 1 - y;

    if (!normalized) {
        r = Math.round(255 * r);
        g = Math.round(255 * g);
        b = Math.round(255 * b);
    }

    return [r, g, b];
};
export const rgb2cmyk = (color: number[], normalized?: boolean) => {
    let c = 1 - color[0] / 255;
    let m = 1 - color[1] / 255;
    let y = 1 - color[2] / 255;
    let k = Math.min(c, Math.min(m, y));

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);

    if (!normalized) {
        c = Math.round(c * 10000) / 100;
        m = Math.round(m * 10000) / 100;
        y = Math.round(y * 10000) / 100;
        k = Math.round(k * 10000) / 100;
    }

    c = isNaN(c) ? 0 : c;
    m = isNaN(m) ? 0 : m;
    y = isNaN(y) ? 0 : y;
    k = isNaN(k) ? 0 : k;

    return [Math.round(c), Math.round(m), Math.round(y), Math.round(k)];
};

/*
 * HSV Convert
 * https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
 */
export const hsv2rgb = (color: number[]) => {
    let h = color[0] / 360;
    let s = color[1] / 100;
    let v = color[2] / 100;
    let r: number, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
        default:
            // fallback introduces for typescript
            (r = 0), (g = 0), (b = 0);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
export const rgb2hsv = (color: number[]) => {
    const r = color[0];
    const g = color[1];
    const b = color[2];
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        d = max - min,
        h,
        s = max === 0 ? 0 : d / max,
        v = max / 255;

    switch (max) {
        case min:
            h = 0;
            break;
        case r:
            h = g - b + d * (g < b ? 6 : 0);
            h /= 6 * d;
            break;
        case g:
            h = b - r + d * 2;
            h /= 6 * d;
            break;
        case b:
            h = r - g + d * 4;
            h /= 6 * d;
            break;
        default:
            // fallback introduces for typescript
            (h = 0), (s = 0), (v = 0);
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
};
