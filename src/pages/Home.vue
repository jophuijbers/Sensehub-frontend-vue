<template>
    <div class="home-page">
        <p style="text-align: center;margin-top:-10px;margin-bottom: 10px;">Namens het SenseHub team sorry voor de storingen
        </p>
        <input v-model="searchValue" placeholder="Title, Tag" class="search-bar" type="text">
        <div v-if="!isLoading">
            <div v-if="!searchValue">
                <VideoCarrousel title="Watch list" :collections="getWatchList" :key="`wl-${getWatchList.length}`" />

                <VideoCarrousel v-for="(item, n) in carousels" :key="n" :title="item.title"
                    :collections="item.collections" />
            </div>

            <div>
                <div class="mb-2">
                    <span class="text-lg bold">All movies</span>
                    <span class="text-dark ml-1">{{ getCollections.length }}</span>
                </div>
                <div class="video-grid">
                    <VideoCard v-for="collection in getCollections" :key="collection.id" @click.native="onWatch(collection)"
                        :item="collection" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import VideoCard from "@/components/VideoCard";
import { FETCH_COLLECTIONS, FETCH_COLLECTIONS_WITH_TAG, FETCH_WATCH_LIST } from "@/store/actions.type";
import VideoCarrousel from "../components/VideoCarousel";

export default {
    name: "Home",
    components: { VideoCarrousel, VideoCard },
    data() {
        return {
            isLoading: false,
            searchValue: null,
            carousels: [
                { title: 'Recently added', tag: 'recent', collections: [] },
                { title: 'Nederlands', tag: 'Nederlands', collections: [] },
                { title: 'War', tag: 'War', collections: [] },
                { title: 'Cartoons', tag: 'Cartoons', collections: [] },
                { title: 'Action', tag: 'Action', collections: [] },
                { title: 'Comedy', tag: 'Comedy', collections: [] },
                { title: 'Anime', tag: 'Anime', collections: [] },
                { title: 'Sci-fi', tag: 'Sci-fi', collections: [] },
                { title: 'Documentary', tag: 'Documentary', collections: [] }
            ]
        }
    },
    async created() {
        this.isLoading = true
        await this.$store.dispatch(FETCH_WATCH_LIST)
        await this.fetchCarouselCollections()
        await this.$store.dispatch(FETCH_COLLECTIONS)
        this.isLoading = false
    },
    methods: {
        onWatch(collection) {
            this.$router.push({ name: 'watch', query: { v: collection.id } })
        },

        async fetchCarouselCollections() {
            await Promise.all(this.carousels.map(async (carousel) => {
                carousel.collections = await this.$store.dispatch(FETCH_COLLECTIONS_WITH_TAG, carousel.tag)
            }))
        }
    },
    computed: {
        ...mapGetters(['getCollections', 'getWatchList'])
    },
    watch: {
        async searchValue() {
            await this.$store.dispatch(FETCH_COLLECTIONS, this.searchValue)
        }
    }
}
</script>