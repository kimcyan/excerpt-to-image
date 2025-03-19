const capture = document.getElementById('capture');
const decoratedDiv = document.getElementById('decoratedDiv');
const textInput = document.getElementById('textInput');
const textSource = document.getElementById('textSource');
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const gradColor1 = document.getElementById('gradColor1');
const gradColor2 = document.getElementById('gradColor2');
const reverseGradientButton = document.getElementById('reverseGradient');
const bgImageInput = document.getElementById('bgImage');

function drawDiv() {
  const bgType = document.querySelector('input[name="bgType"]:checked').value;
  const hAlign = document.querySelector("input[name='imgAlignH']:checked").value;
  const vAlign = document.querySelector("input[name='imgAlignV']:checked").value;
  decoratedDiv.style.backgroundImage = 'none';
  decoratedDiv.style.backgroundColor = '';
  if (bgType === 'solid') {
    decoratedDiv.style.backgroundColor = bgColorInput.value;
  } else if (bgType === 'gradient') {
    decoratedDiv.style.background = `linear-gradient(45deg, ${gradColor1.value}, ${gradColor2.value})`;
  } else if (bgType === 'image' && bgImageInput.files.length > 0) {
    const img = new Image();
    img.src = URL.createObjectURL(bgImageInput.files[0]);
    img.onload = () => {
      decoratedDiv.style.background = `url(${img.src}) center/cover no-repeat`;
      decoratedDiv.style.backgroundPosition = `${hAlign} ${vAlign}`;
    };
  }
  document.querySelectorAll("input[name='markType']").forEach((radio) => {
    radio.addEventListener('change', () => {
      document.getElementById('capture').style.height = `${radio.value}px`;
    });
  });
  textInput.style.color = textColorInput.value;
  textSource.style.color = textColorInput.value;
  textInput.style.textAlign = document.querySelector('input[name="textAlign"]:checked').value;
  textSource.style.textAlign = document.querySelector('input[name="textAlign"]:checked').value;
  decoratedDiv.style.justifyContent = document.querySelector(
    'input[name="textVAlign"]:checked'
  ).value;
  textInput.style.fontSize = document.querySelector('input[name="textSize"]:checked').value;
  textInput.style.fontWeight = document.querySelector('input[name="textWeight"]:checked').value;
  textInput.style.fontFamily =
    document.querySelector('input[name="textType"]:checked').value === 'sans'
      ? 'Noto Sans KR'
      : 'Noto Serif KR';
}
//날짜
function getFormattedTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
//이미지 저장
function saveImageJPG() {
  window.scrollTo(0, 0);
  html2canvas(decoratedDiv, {}).then((canvas) => {
    const link = document.createElement('a');
    link.download = `bookmark${getFormattedTimestamp()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
}
function saveImagePNG() {
  window.scrollTo(0, 0);
  html2canvas(decoratedDiv, {}).then((canvas) => {
    const link = document.createElement('a');
    link.download = `bookmark${getFormattedTimestamp()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

//배경 타입 옵션 변경
document.querySelectorAll("input[name='bgType']").forEach((radio) => {
  radio.addEventListener('change', () => {
    document.getElementById('solidOptions').style.display =
      radio.value === 'solid' ? 'block' : 'none';
    document.getElementById('gradientOptions').style.display =
      radio.value === 'gradient' ? 'block' : 'none';
    document.getElementById('imageOptions').style.display =
      radio.value === 'image' ? 'block' : 'none';
    drawDiv();
  });
});
//단색 프리셋 버튼
document.querySelectorAll('.preset').forEach((button) => {
  button.style.background = button.dataset.color;
  button.addEventListener('click', () => {
    bgColorInput.value = button.dataset.color;
    drawDiv();
  });
});
//그라디언트 프리셋 버튼
document.querySelectorAll('.gradientPreset').forEach((button) => {
  const colors = button.dataset.colors.split(',');
  button.style.background = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
  button.addEventListener('click', () => {
    gradColor1.value = colors[0];
    gradColor2.value = colors[1];
    drawDiv();
  });
});
//그라디언트 색 뒤집기
reverseGradientButton.addEventListener('click', () => {
  [gradColor1.value, gradColor2.value] = [gradColor2.value, gradColor1.value];
  drawDiv();
});
//글자 색상 프리셋 버튼
document.querySelectorAll('.textPreset').forEach((button) => {
  button.style.background = button.dataset.color;
  button.addEventListener('click', () => {
    textColorInput.value = button.dataset.color;
    drawDiv();
  });
});

document.querySelectorAll("input[name='imgAlignH']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
document.querySelectorAll("input[name='imgAlignV']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
document.querySelectorAll("input[name='textAlign']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
document.querySelectorAll("input[name='textVAlign']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
document.querySelectorAll("input[name='textType']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
document.querySelectorAll("input[name='textSize']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
document.querySelectorAll("input[name='textWeight']").forEach((radio) => {
  radio.addEventListener('change', () => {
    drawDiv();
  });
});
bgColorInput.addEventListener('input', drawDiv);
textColorInput.addEventListener('input', drawDiv);
gradColor1.addEventListener('input', drawDiv);
gradColor2.addEventListener('input', drawDiv);
bgImageInput.addEventListener('change', drawDiv);

drawDiv();

//출처
document.getElementById('addSourceBtn1').addEventListener('click', function () {
  const source1 = document.getElementById('textSource1');

  if (source1.style.display === 'none' || source1.style.display === '') {
    source1.style.display = 'block';
    this.textContent = '출처 1 삭제';
  } else {
    source1.style.display = 'none';
    this.textContent = '출처 1 추가';
  }
});
document.getElementById('addSourceBtn2').addEventListener('click', function () {
  const source1 = document.getElementById('textSource2');

  if (source1.style.display === 'none' || source1.style.display === '') {
    source1.style.display = 'block';
    this.textContent = '출처 2 삭제';
  } else {
    source1.style.display = 'none';
    this.textContent = '출처 2 추가';
  }
});
