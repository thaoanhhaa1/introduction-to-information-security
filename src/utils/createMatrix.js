export default function createMatrix(m, n) {
    const matrix = new Array(m);
    for (var i = 0; i < m; i++) {
        matrix[i] = new Array(n); // make each element an array
    }
    return matrix;
}
