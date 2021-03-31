function weather() {
		$.ajax({
			type: 'GET',
			url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + '广州',
			dataType: 'JSON',
			error: function() {},
			success: function(res) {
				if (res.status == 1000) {
					$('#box').append('<span>' + res.data.forecast[0].low.substring(2, 6) + res.data.forecast[0].high.substring(2,6) + '</span>');
					$('#box').append('<span>' + res.data.forecast[0].type + '</span>');
				}
			}
		});
	}
	weather();