class PinsController < ApplicationController
	def map
	end

	def index
		@pins = Pin.all
		render json: @pins
	end

	def create
		@pin = Pin.new(pin_params)
		if @pin.save
			render json: @pin
		end
	end

	private
	def pin_params
		params.require(:pin).permit(:lat, :lng)
	end
end
