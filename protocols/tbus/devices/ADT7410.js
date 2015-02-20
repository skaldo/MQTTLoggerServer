/**
 * Created by skaldo on 2/15/2015.
 */
var ADT7410 = {
    id: 0x07,
    name: "ADT7410",
    description: "Precise T-Bus thermometer array",
    commands: {
        read: 1
    },
    convertTo: {
        int: function (buff) {
            var rawValue;
            // reading 16bit integer
            rawValue = buff.readInt16BE(0);
            if (!rawValue) {
                return 0;
            }
            if (rawValue & (1 << 15)) {
                // negative Temperature
                rawValue = (rawValue - 65536);
            }
            // Conversion to °C temperature
            return rawValue / 128;
        },
        string: function (buff) {
            var rawValue;
            // reading 16bit integer
            rawValue = buff.readInt16BE(0);
            if (!rawValue) {
                return 0;
            }
            if (rawValue & (1 << 15)) {
                // negative Temperature
                rawValue = (rawValue - 65536);
            }
            // Conversion to °C temperature
            return rawValue / 128 + '°C';
        }
    },
    randomData: function () {
        var tmp = Math.floor(((Math.random() * 100) + 1) * 128);
        var buff = new Buffer(2);
        buff.writeInt16BE(tmp, 0);
        return buff;
    }
};

module.exports = ADT7410;
