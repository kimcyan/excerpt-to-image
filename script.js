const capture = document.getElementById('capture');
const decoratedDiv = document.getElementById('decoratedDiv');
const textInput = document.getElementById('textInput');
const textSource = document.getElementById('textSource');
const reverseGradientButton = document.getElementById('reverseGradient');
const bgImageInput = document.getElementById('bgImage');
const textColorInput = document.getElementById('textColor');
const solidColorInput = document.getElementById('solidColor');
const gradColor1 = document.getElementById('gradColor1');
const gradColor2 = document.getElementById('gradColor2');
const textColorHex = document.getElementById('textColorHex');
const solidColorHex = document.getElementById('solidColorHex');
const gradColor1Hex = document.getElementById('gradColor1Hex');
const gradColor2Hex = document.getElementById('gradColor2Hex');

// 배경 업데이트
const updateBackground = () => {
  const bgType = document.querySelector('input[name="bgType"]:checked').value;
  decoratedDiv.style.backgroundImage = 'none';
  decoratedDiv.style.backgroundColor = '';

  if (bgType === 'solid') {
    decoratedDiv.style.backgroundColor = solidColorInput.value;
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
};

// 글자 업데이트
const updateTextStyle = () => {
  textInput.style.color = textColorInput.value;
  textSource.style.color = textColorInput.value;
  textInput.style.fontSize = document.querySelector('input[name="textSize"]:checked').value;
  textInput.style.fontWeight = document.querySelector('input[name="textWeight"]:checked').value;
  textInput.style.fontFamily =
    document.querySelector('input[name="textType"]:checked').value === 'sans' ? 'Noto Sans KR' : 'Noto Serif KR';
};

// 정렬 업데이트
const updateTextAlign = () => {
  textInput.style.textAlign = document.querySelector('input[name="textAlign"]:checked').value;
  textSource.style.textAlign = document.querySelector('input[name="textAlign"]:checked').value;
  decoratedDiv.style.justifyContent = document.querySelector('input[name="textVAlign"]:checked').value;
};

// 이미지 정렬 업데이트
const updateImageAlign = () => {
  const hAlign = document.querySelector("input[name='imgAlignH']:checked").value;
  const vAlign = document.querySelector("input[name='imgAlignV']:checked").value;
  decoratedDiv.style.backgroundPosition = `${hAlign} ${vAlign}`;
};

// 발췌 비율 업데이트
const updateCaptureHeight = () => {
  document.getElementById('capture').style.aspectRatio = document.querySelector("input[name='markType']:checked").value;
};

//이벤트 리스너
document
  .querySelectorAll("input[name='bgType']")
  .forEach((radio) => radio.addEventListener('change', updateBackground));
document
  .querySelectorAll("input[name='markType']")
  .forEach((radio) => radio.addEventListener('change', updateCaptureHeight));
document
  .querySelectorAll("input[name='textAlign']")
  .forEach((radio) => radio.addEventListener('change', updateTextAlign));
document
  .querySelectorAll("input[name='textVAlign']")
  .forEach((radio) => radio.addEventListener('change', updateTextAlign));
document
  .querySelectorAll("input[name='textType']")
  .forEach((radio) => radio.addEventListener('change', updateTextStyle));
document
  .querySelectorAll("input[name='textSize']")
  .forEach((radio) => radio.addEventListener('change', updateTextStyle));
document
  .querySelectorAll("input[name='textWeight']")
  .forEach((radio) => radio.addEventListener('change', updateTextStyle));
document
  .querySelectorAll("input[name='imgAlignH']")
  .forEach((radio) => radio.addEventListener('change', updateImageAlign));
document
  .querySelectorAll("input[name='imgAlignV']")
  .forEach((radio) => radio.addEventListener('change', updateImageAlign));
bgImageInput.addEventListener('change', updateBackground);

// 이미지 저장 날짜
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
// 이미지 저장
function saveImageJPG() {
  window.scrollTo(0, 0);
  html2canvas(decoratedDiv, { backgroundColor: null, scale: 864 / decoratedDiv.clientWidth }).then((canvas) => {
    const link = document.createElement('a');
    link.download = `bookmark${getFormattedTimestamp()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
}
function saveImagePNG() {
  window.scrollTo(0, 0);
  html2canvas(decoratedDiv, { backgroundColor: null, scale: 864 / decoratedDiv.clientWidth }).then((canvas) => {
    const link = document.createElement('a');
    link.download = `bookmark${getFormattedTimestamp()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// 색상 HEX
const syncColorInputs = (colorInput, hexInput, newColor) => {
  colorInput.value = newColor;
  hexInput.value = newColor.toUpperCase();
};
document.querySelectorAll('.colorPickBox').forEach((box) => {
  const colorInput = box.querySelector("input[type='color']");
  const hexInput = box.querySelector("input[type='text']");
  hexInput.addEventListener('input', ({ target }) => {
    if (/^#([0-9A-Fa-f]{6})$/.test(target.value)) {
      syncColorInputs(colorInput, hexInput, target.value);
      updateTextStyle();
      updateBackground();
    }
  });
  colorInput.addEventListener('input', ({ target }) => {
    syncColorInputs(colorInput, hexInput, target.value);
    updateTextStyle();
    updateBackground();
  });
});

// 글자 색상 프리셋 버튼
document.querySelectorAll('.textPreset').forEach((button) => {
  button.style.background = button.dataset.color;
  button.addEventListener('click', () => {
    textColorInput.value = button.dataset.color;
    syncColorInputs(textColorInput, textColorHex, button.dataset.color);
    updateTextStyle();
  });
});

// 배경 타입 옵션 변경
const updateBgOptions = () => {
  const bgType = document.querySelector("input[name='bgType']:checked").value;
  document.getElementById('solidOptions').style.display = bgType === 'solid' ? 'block' : 'none';
  document.getElementById('gradientOptions').style.display = bgType === 'gradient' ? 'block' : 'none';
  document.getElementById('imageOptions').style.display = bgType === 'image' ? 'block' : 'none';
  updateBackground();
};
document.querySelectorAll("input[name='bgType']").forEach((radio) => radio.addEventListener('change', updateBgOptions));
// 단색 프리셋 버튼
document.querySelectorAll('.preset').forEach((button) => {
  button.style.background = button.dataset.color;
  button.addEventListener('click', () => {
    solidColorInput.value = button.dataset.color;
    syncColorInputs(solidColorInput, solidColorHex, button.dataset.color);
    updateBackground();
  });
});
// 그라디언트 프리셋 버튼
document.querySelectorAll('.gradientPreset').forEach((button) => {
  const colors = button.dataset.colors.split(',');
  button.style.background = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
  button.addEventListener('click', () => {
    gradColor1.value = colors[0];
    gradColor2.value = colors[1];
    syncColorInputs(gradColor1, gradColor1Hex, colors[0]);
    syncColorInputs(gradColor2, gradColor2Hex, colors[1]);
    updateBackground();
  });
});
// 그라디언트 색 뒤집기
reverseGradientButton.addEventListener('click', () => {
  [gradColor1.value, gradColor2.value] = [gradColor2.value, gradColor1.value];
  syncColorInputs(gradColor1, gradColor1Hex, gradColor1.value);
  syncColorInputs(gradColor2, gradColor2Hex, gradColor2.value);
  updateBackground();
});

//초기 실행
updateBackground();
updateCaptureHeight();
updateTextStyle();
updateTextAlign();
updateImageAlign();

//출처
document.getElementById('addSource1').addEventListener('change', function () {
  const source1 = document.getElementById('textSource1');
  source1.style.display = this.checked ? 'block' : 'none';
});
document.getElementById('addSource2').addEventListener('change', function () {
  const source1 = document.getElementById('textSource2');
  source1.style.display = this.checked ? 'block' : 'none';
});
