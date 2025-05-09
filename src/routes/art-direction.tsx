import * as DB from '../db.json'

export default function ArtDirection() {
    return (
        <main class="w-full p-3">
            <div class="flex gap-1 justify-center items-center w-full">
                <div class="w-full">
                    test
                </div>
                <div class="w-full">
                    <div class="gap-1 flex w-full">
                    <div class=""><img class="w-[25vw] max-h-[360px] object-cover" src="./me.jpeg" /></div>
                    <div class=""><img class="w-[25vw] max-h-[360px] object-cover" src="./me.jpeg" /></div>
                    </div>
                </div>
            </div>
        </main>
    );
}