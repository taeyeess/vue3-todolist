<template>
    <button 
        :btnType="btnType"
        :class="btnType"
        class="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "TodoButton",
    props: {
        // props 정의
        btnType: {
            type: String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
.button {
    // btnType="btn-add" 
    &.btn-add {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0px 10px rgba(0,0,0,.3);
		transition: all 0.3s ease-out;
        	
		img {
			transition: all 0.3s ease-out;
		}
 
		&:hover {
			img {
				transform: translateX(3px);
			}
		}
    }

    // btnType="btn-clear"
    &.btn-clear {
		width: 80px;
		height: 30px;
		padding: 5px;
		font-size: 12px;    
		color: #fff;
		background: rgba(255,255,255,.2);
		border-radius: 20px;
		text-align: center;
	}
}
</style>