class Pin < ActiveRecord::Base
	validates :lat, :lng, presence: true
end
