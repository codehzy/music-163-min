import { HYEventStore } from 'hy-event-store'
import { getPlayListDetail } from '../services/music'

const recommendStore = new HYEventStore({
    state: {
        recommendSongsInfo: {} 
    },
    actions: {
        async fetchRecommendSongs(ctx:any) {
            const { playlist } = await getPlayListDetail('3778678')
            ctx.recommendSongsInfo = playlist 
        }
    }
})

export default recommendStore
