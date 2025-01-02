// Insert todo list here

function interpret(code,modules) {
    let variables = {};
    let colon2 = {
        console: {
            log: function (str) {
                if (str[0] == "$") {
                    console.log(variables[str.slice(1)]);
                } else {
                    console.log(str);
                }
            },
            clear: function () {
                console.clear();
            },
            throw_err: function (str) {
                console.error(str);
            }
        },
        variable: {
            set: function (key,val) {
                if (val[0] == "$") {
                    variables[key] = variables[val.slice(1)];
                } else {
                    variables[key] = val;
                }
            },
            add: function (key,val) {
                if (val[0] == "$") {
                    variables[key] = Number(variables[key]) + Number(variables[val.slice(1)]);
                } else {
                    variables[key] = Number(variables[key]) + Number(val);
                }
            },
            subtract: function (key,val) {
                if (val[0] == "$") {
                    variables[key] = Number(variables[key]) - Number(variables[val.slice(1)]);
                } else {
                    variables[key] = Number(variables[key]) - Number(val);
                }
            },
            divide: function (key,val) {
                if (val[0] == "$") {
                    variables[key] = Number(variables[key]) / Number(variables[val.slice(1)]);
                } else {
                    variables[key] = Number(variables[key]) / Number(val);
                }
            },
            multiply: function (key,val) {
                if (val[0] == "$") {
                    variables[key] = Number(variables[key]) * Number(variables[val.slice(1)]);
                } else {
                    variables[key] = Number(variables[key]) * Number(val);
                }
            },
            user_input: function (key,val) {
                variables[key] = prompt(`Line ${line_num} is requesting user input.`)
            },
            concat: function (key,val) {
                if (val[0] == "$") {
                    variables[key] = variables[key] + variables[val.slice(1)];
                } else {
                    variables[key] = variables[key] + val;
                }
            }
        }
    };

    eval(modules);
    register();

    let lines = code.split("\n");
    let line_num = 0;
    let line;

    while (line_num < lines.length) {
        line = lines[line_num];
        if (line != "" && line.includes(":")) {
            let colon_pos = line.indexOf(":");
            let param_pos = line.indexOf("(");

            let command = line.slice(0,colon_pos);
            let sub_command = line.slice(colon_pos+1,param_pos);
            let values = line.slice(param_pos+1).split(")")[0].split(/(?<!\\),/);;
            for (let val of values) {
                values[values.indexOf(val)] = val.replace(/\\,/g, ",")
            }
            if (command in colon2) {
                if (sub_command in colon2[command]) {
                    colon2[command][sub_command](...values);
                } else {
                    console.error(`Error has been issued at Line ${line_num+1}: ${command} does not have subcommand ${sub_command}`)
                }
            } else {
                console.error(`Error has been issued at Line ${line_num+1}: ${command} doesn't seem to exist in current scope`)
            }
        } else if (!line.includes(":") && line[0] != "-" && line != "") {
            console.error(`Invalid syntax at Line ${line_num+1}. If this is an attempt to make a comment try using - ${line} instead.`);
            line_num = lines.length
        }

        line_num++
    }
}