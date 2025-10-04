/**
 * @supported Quantumult X (v1.0.8-build253)
 */

// $resource, $notify(title, subtitle, message)
// HTTP reqeust and persistent storage related APIs are not supported in resource parser.

// $resource.link contains the original URL of the resource or the path if the resource is local.
// $resource.content contains the response(UTF8) from the URL .

// $done({error : "error description"});
// $done({content : "the modified content"});

function DomainSetParser(content) {
    var contentLines = content.split("\n");
    var comments = ["//", "#", ";", "["]
    var result = []
    for (var i = 0; i < contentLines.length; ++i) {
        line = contentLines[i].trim();
        const commentCheck = (item) => line.indexOf(item) != -1;
        if(!comments.some(commentCheck) && line) {
            if (line[0] == "."){
                result.push("host-suffix, " + line.slice(1 , line.length) + ", reject")
            } else {
                result.push("host, " + line + ", reject")
            }
        }
    }
    return result.join("\n")
}

parsedContent = DomainSetParser($resource.content)
$done({content : parsedContent});

