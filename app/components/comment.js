export const commentItem = (date, writer, content) =>{
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    // 날짜 포맷 변경 YYYY-MM-DD
    const dateStr = `${year}-${month}-${day}`;
    // 시간 포맷 변경 hh:mm:ss
    const timeStr = `${hours}:${minutes}:${seconds}`;

    // 날짜와 시간을 합쳐서 YYYY-MM-DD hh:mm:ss
    const dateTimeStr = `${dateStr} ${timeStr}`;
    return`
    <div class="boardItem">
        <div class="info">
            <h3 class="content">추천수 <b>${content}</b></h3>
            <p class="date">${dateTimeStr}</p>
        </div>
        <div class="writerInfo">
            <h2 class="writer">${writer}</h2>
        </div>
    </div>
    `
}