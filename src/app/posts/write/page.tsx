"use client";

export default function Home() {
    
    const handleSubmit = (e:any) => {
        e.preventDefault();

        const form=e.target;
        const titleInput=form.title;
        const contentInput=form.content;
    
        if(titleInput.value.length==0){
            alert("제목을 입력해주세요.");
            titleInput.focus();
        }
        if(contentInput.value.length==0){
            alert("내용을 입력해주세요.");
            contentInput.focus();
        }
    };
    
    return (
    <>    
    <div className="flex flex-col gap-6">
    <h1 className="text-center">새 글 작성</h1>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="제목" />
            <textarea name="content" placeholder="내용" />
            <button type="submit">저장</button> 
        </form>
        </div>
    </>
    );
}