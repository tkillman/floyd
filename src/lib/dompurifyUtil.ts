import DOMPurify from 'dompurify';
import { Matrix } from '~/src/domain/matrix.domain';
import { Distance } from '~/src/domain/distance.domain';

/**
 *  Matrix를 테이블로 렌더링
 * @param paramMatrix
 * @param title
 * @returns
 */
export const renderMatrixToTable = (
  paramMatrix: Matrix,
  title: string,
  isShowIndex = false
) => {
  const nodeCount = paramMatrix.length;

  if (nodeCount === 0) {
    return '';
  }

  let tableHTML = `<h2>${title}</h2>
    <table>
    <tr>
      <th class="diagonal">
        <span class="top-text">도착 b</span>  
        <span class="bottom-text">출발 a</span>
      </th>`;

  for (let i = 0; i < nodeCount; i++) {
    tableHTML += `<th>${isShowIndex ? i : i + 1}</th>`;
  }
  tableHTML += '</tr>';

  // 행 데이터 작성
  for (let i = 0; i < nodeCount; i++) {
    tableHTML += `<tr><th>${isShowIndex ? i : i + 1}</th>`;
    for (let j = 0; j < nodeCount; j++) {
      tableHTML += `<td>`;
      tableHTML += '<span style="font-weight: 700;">';

      tableHTML += `${
        paramMatrix[i][j] === Infinity ? '무한' : paramMatrix[i][j]
      }`;

      tableHTML += '</span>';

      if (isShowIndex) {
        tableHTML += `<span class="index">  (D[${i}][${j}])</span>`;
      }

      tableHTML += '</td>';
    }

    tableHTML += '</tr>';
  }

  tableHTML += '</table>';

  const sanitizedHtml = DOMPurify.sanitize(tableHTML);

  return sanitizedHtml;
};

export const renderDistanceToTable = (param: {
  distance: Distance;
  startNodeNum: string;
  title: string;
}) => {
  const { distance, startNodeNum, title } = param;

  if (!startNodeNum) {
    return '';
  }

  const start = Number(startNodeNum);

  if (isNaN(start)) {
    return '';
  }

  const nodeCount = distance.length;

  if (nodeCount === 0) {
    return '';
  }

  let tableHTML = `<h2>${title}</h2>
  <table>
  <tr>
    <th class="diagonal">
      <span class="top-text">도착</span>  
      <span class="bottom-text">출발</span>
    </th>`;

  for (let i = 0; i < nodeCount; i++) {
    tableHTML += `<th>${i + 1}</th>`;
  }
  tableHTML += '</tr>';

  // 행 데이터 작성
  tableHTML += `<tr><th>${start}</th>`;

  for (let i = 0; i < nodeCount; i++) {
    tableHTML += `<td>${distance[i] === Infinity ? '무한' : distance[i]}</td>`;
  }
  tableHTML += '</tr>';
  tableHTML += '</table>';

  const sanitizedHtml = DOMPurify.sanitize(tableHTML);

  return sanitizedHtml;
};
