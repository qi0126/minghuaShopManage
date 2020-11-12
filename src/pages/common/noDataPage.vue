<template>
	<div class="imgWrap">
		<img src="/static/images/noFound/noData.png" alt />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	created() {}
}
</script>

<style lang="scss" scoped>
.imgWrap {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 58vh;
}
</style>
