//이미지 미리보기 처리(개수 무관)
        $(function () {
            $(".preview-input").on("input", function () {

                //미리보기를 생성하기 전에 기존에 .preview-area에 있는 이미지를 제거 
                // - 있을지 없을지 모르며, 있다면 URL.revokeObjectURL()을 써서 회수까지 해줘야 함
                // - jQuery 에서 제공하는 반복 함수 : each 를 사용 (for보다 편함)
                $(".preview-area").find("img").each(function(){
                    //this == 현재 순서의 이미지
                    //이미지 주소 회수 + 이미지 태그 삭제 ( or 영역 비우기 )
                    var address = $(this).attr("src");
                    URL.revokeObjectURL(address); //자원 회수 지시
                    // $(this).remove(); //이 태그를 삭제해라
                });
                $(".preview-area").empty(); //도 가능   영역 비우기

                //미리보기 생성
                if (this.files.length > 0) { //파일 선택
                    for(var i = 0; i < this.files.length ; i++){ //선택한 파일 수 만큼
                        //이미지를 만들어서
                        var img = $("<img>")
                            .addClass("imgae-shadow image-round")
                            .attr("src", URL.createObjectURL(this.files[i]))
                            .prop("height", 100);
                        // .preview-area에 추가
                        $(".preview-area").append(img); 
                    }
                }

            });
        });