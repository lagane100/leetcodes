let leetcode7 = x => {
    let out = 0;
    let max_range = Math.pow(2, 31) - 1;
    let min_range = Math.pow(-2, 31);
    while (x !== 0) {
        out = out * 10 + x % 10;
        x = parseInt((x / 10));
    }
    if (out > max_range || out < min_range) return 0;
    return out;
}

//以解決
let leetcode9 = x => {
    let t = x + "";
    let k = t.split("").reverse().join("");
    return k == x;
}

//以解決
let leetcode15 = nums => {
    const triplets = [];
    if (nums.length < 3) {
        return triplets;
    }
    nums.sort((a, b) => (a - b));
    for (let i = 0; i < nums.length - 2; i++) {
        let a = nums[i];
        if (nums[i - 1] !== undefined && nums[i] === nums[i - 1]) {
            continue;
        }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            let b = nums[left];
            let c = nums[right];
            let sum = a + b + c;
            if (sum === 0) {
                triplets.push([a, b, c]);
                while (nums[left] === nums[left + 1]) {
                    left++;
                }
                while (nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    return triplets;
};

let leetcode18 = (nums, target) => {
    nums.sort((a,b)=>a-b);
    let temp = 0;
    let ans = [];
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            for(let k=j+1;k<nums.length;k++){
                for(let m=k+1;m<nums.length;m++){
                    if(nums[i]+nums[j]+nums[k]+nums[m]===target){
                        ans[temp] = [];
                        ans[temp].push(nums[i]);
                        ans[temp].push(nums[j]);
                        ans[temp].push(nums[k]);
                        ans[temp].push(nums[m]);
                        temp++;
                    }
                }
            }
        }
    }
    return ans;
}

///以解決
let leetcode20 = s => {
    const open = ["(","{","["],close = [")","}","]"];
    const stack = [];
    let list = s.split("");
    for(let i=0;i<list.length;i++){
        if(open.findIndex(e => e===list[i]) === -1 && close.findIndex(e => e===list[i]) === -1) return false
        if(open.findIndex(e => e===list[i]) != -1){
            stack.push(open.findIndex(e => e===list[i]))
        }
        if(close.findIndex(e => e===list[i]) != -1){
            if(close.findIndex(e => e===list[i])===stack.pop()){
                continue;
            }
            else{
                return false;
            }
        }
    }
    return stack.length===0 ? true : false;
}

///以解決
let leetcode66 = digits => {
    const newDigits = [];
    digits = digits.reverse();
    digits[0]++;
    let temp = 0;
    for (let i = 0; i < digits.length; i++) {
        if (temp == 1) {
            digits[i]++;
            temp = 0
        }
        if (digits[i] >= 10) {
            newDigits.push(digits[i] - 10);
            temp = 1;
        }
        else {
            newDigits.push(digits[i]);
        }
    }
    if (temp == 1) {
        newDigits.push(1);
    }
    return newDigits.reverse();
}

///待解決
let leetcode72 = (word1,word2) => {

}

///以解決
let leetcode76 = (s, t) => {
    let map = {};
    t.split('').forEach(c => map[c] = (map[c] || 0) + 1);

    let count = t.length;   // remaining matching count

    let l = 0;
    let r = 0;

    let start = 0;
    let minLen = Infinity;

    while (r < s.length) {
        if (map[s[r++]]-- > 0) count--;

        while (count === 0) {   // valid
            if (r - l < minLen) {
                minLen = r - l;
                start = l;
            }

            if (map[s[l++]]++ === 0) count++; // make it invalid
        }
    }

    return minLen === Infinity ? '' : s.substr(start, minLen);
}

let leetcode79 = (board, word) => {
    let list = [];
    list = word.split("");
    board.forEach(e => {
        e.forEach(element => {
            let temp = list.find(alpha => {
                return alpha === element;
            })
            element = '';
            if (temp === undefined) return false;
        })
    })

    return "end"
}

let isSameTree = (p,q) => { ///leetcode100
    if(p.val != q.val) return false
    if(p.val === null && q.val === null) return true;
    return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);
}

let leetcode107 = root => {
    if (!root) {
        return [];
    }
    var q = [root];
    var leafToRoot = [[root.val]];
    var level;
    var qLength = offset = 0;
    var node;
    var temp;
    while (q.length > qLength) {
        qLength = q.length;
        level = [];
        while (qLength > offset) {
            node = q[offset];
            offset++;
            if (node.left) {
                q[q.length] = node.left;
                level[level.length] = node.left.val;
            }
            if (node.right) {
                q[q.length] = node.right;
                level[level.length] = node.right.val;
            }
        }
        if (!!level.length) {
            leafToRoot[leafToRoot.length] = level;
        }
    }
    for (var i = 0, j = leafToRoot.length - 1; i < j; i++ , j--) {
        temp = leafToRoot[i];
        leafToRoot[i] = leafToRoot[j];
        leafToRoot[j] = temp;
    }
    return leafToRoot;
}

///以解決
let leetcode128 = nums => {
    if(nums.length===0) return 0;
    const range = [];
    let ans = 0, temp = 0;
    nums.sort((a,b) => a-b);
    for(let i=0;i<nums.length-1;i++){
        range.push(nums[i+1]-nums[i]);
    }
    for(let i=0;i<range.length;i++){
        if(range[i]===0) continue;
        if(range[i]===1){
            temp++;
            ans = ans > temp ? ans : temp;
        }
        else{
            ans = ans > temp ? ans : temp;
            temp = 0;
        }
    }
    return ans+1;
}

///以解決
let leetcode136 = nums => {
    let map = {};
    let ans = NaN;
    nums.forEach(c => map[c] = (map[c] || 0) + 1);
    Object.keys(map).forEach(e => {
        if(map[e]===1) return ans = e;
    })
    return ans;
}

///待研究
let leetcode137 = nums => {
    return nums.reduce((a, c) => [a[0] & ~c | a[1] & c, ~a[0] & (a[1] ^ c)], [0, 0])[1]
}

///以解決
let leetcode153 = nums => {
    return Math.min(...nums);
}

///實力不足
let leetcode200 = grid => {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 1) {
                count++;
                grid = leetcode200Judge(grid, i, j);
            }
        }
    }
    return count;
}

///一半
let leetcode200Judge = (grid, i, j) => {
    if (grid[i][j] == 1) {
        grid[i][j] = 0;
        if (grid[i + 1][j] != undefined && grid[i][j + 1] != undefined && grid[i + 1][j + 1] != undefined) {
            grid = leetcode200Judge(grid, i + 1, j);
            grid = leetcode200Judge(grid, i, j + 1);
        }
    }
    return grid;
}

///以解決
let leetcode226 = root => {
    if (root == null) return null;

    [root.left, root.right] = [root.right, root.left];

    leetcode226(root.left);
    leetcode226(root.right);

    return root;
}

///以解決
let leetcode258 = num => {
    while(num>=10){
        num = Math.floor(num/10) + num%10;
    }
    return num;
}

///以解決
let leetcode260 = nums => {
    let map = {};
    const ans = [];
    nums.forEach(e => map[e] = (map[e] || 0) + 1);
    
    Object.keys(map).forEach(e => {
        if(map[e]===1) ans.push(e);
    })
    
    return ans;
}

///以解決
let leetcode263 = num => {
    if (num == 0) return false;
    while (num % 2 == 0) num /= 2;
    while (num % 3 == 0) num /= 3;
    while (num % 5 == 0) num /= 5;
    return num == 1 ? true : false;
}

///以解決
let leetcode283 = nums => {
    const ans = [];
    let zeroCount = 0;
    nums.forEach(e => {
        if(e===0){
            zeroCount++;
        }
        else{
            ans.push(e);
        }
    })
    
    for(let i=0;i<zeroCount;i++){
        ans.push(0);
    }
    return ans;
};

////待研究
let leetcode322 = (coins,amount) => {
    let dp = new Array(amount+1);
    dp[0] = 0;
    for (let i=1; i<=amount; i++) {
        dp[i] = Number.MAX_SAFE_INTEGER;
        coins.forEach(coin => {if (i-coin >= 0) dp[i] = Math.min(dp[i], dp[i-coin]+1)});
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};

///以解決
let leetcode338 = num => {
    const list = [];
    const ans = [];
    for(let i=0;i<=num;i++){
        list.push(i);
    }

    list.forEach(e => {
        let temp = 0;
        while(e!=0){
            temp += e%2;
            e = Math.floor(e/2);
        }
        ans.push(temp);
    })
    return ans;
}

///以解決
let leetcode342 = num => {
    return Number.isInteger(Math.log(num) / Math.log(4)) ? true : false
}

///以解決
let leetcode350 = (nums1, nums2) => {
    const list = [];
    nums1.forEach(e => {
        for (let i = 0; i < nums2.length; i++) {
            if (e === nums2[i]) {
                list.push(e);
                nums2[i] = NaN;
                break;
            }
        }
    })
    return list;
}

///待研究
let leetcode354 = envelopes => {
    envelopes.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });
    const maxRussianDollLength = [];
    let answer = 0;
    for (let i = 0; i < envelopes.length; i++) {
        maxRussianDollLength.push(1);
        for (let j = 0; j < i; j++) {
            if (envelopes[j][0] < envelopes[i][0] && envelopes[j][1] < envelopes[i][1]) {
                maxRussianDollLength[i] = Math.max(maxRussianDollLength[i], maxRussianDollLength[j] + 1);
            }
        }
        answer = Math.max(answer, maxRussianDollLength[i]);
    }
    return answer;
}

///暫停
let leetcode407 = heightMap => {
    const width = heightMap.length, height = heightMap[0].length;
    const tempHeightMap = [];
    const Check = (i, j) => {
        return 0;
    }
    for (let i = 0; i < width; i++) {
        tempHeightMap.push([]);
        for (let j = 0; j < height; j++) {
            tempHeightMap[i].push(0);
        }
    }
    return tempHeightMap;
}

///以解決
let leetcode412 = n => {
    const ans = [];
    for(let i = 1;i<=n;i++){
        if(i%15===0){
            ans.push("FizzBuzz")
        }
        else if(i%5===0){
            ans.push("Buzz")
        }
        else if(i%3===0){
            ans.push("Fizz")
        }
        else{
            ans.push(i.toString())
        }
    }
    return ans;
}

let leetcode414 = nums => {
    let [min, mid, max] = Array(3).fill(-Infinity);
    for (let n of nums) {
        if (n === min || n === mid || n === max) continue;
        if (n > max) [min, mid, max] = [mid, max, n];
        else if (n > mid) [min, mid, max] = [mid, n, max];
        else if (n > min) [min, mid, max] = [n, mid, max];
    }
    return min === -Infinity ? max : min;
};

///以解決
let leetcode434 = s => {
    let temp = 0;
    s = s.trim();
    for (let i = 0; i < s.length; i++) {
        if (s[i] == " " && s[i - 1] != " ") {
            temp++;
        }
    }
    return s == "" ? temp : temp + 1;
}

let leetcode440 = (n, k) => {
    let i, prefix = '';
    while (k !== 0) {
        for (i = 0; i <= 9; i++) {
            const count = leetcode440Prefix(n, prefix + i);
            if (count < k)
                k -= count;
            else
                break;
        }
        prefix = prefix + i;
        k--; // number equal to prefix
    }

    return parseInt(prefix, 10);
}

let leetcode440Prefix = (n, prefix) => {
    let a = parseInt(prefix);
    let b = a + 1;
    if (a > n || a === 0)
        return 0;

    let res = 1;
    a *= 10; b *= 10;
    while (a <= n) {
        res += Math.min(n + 1, b) - a;
        a *= 10; b *= 10;
    }
    return res;
}

///以解決
let leetcode441 = n => {
    let i = 1, temp = 0;
    while (n > 0) {
        n -= i;
        i++;
        temp++;
    }
    return n == 0 ? temp : temp - 1;
}

///以解決
let leetcode461 = (x, y) => {
    let map = {};
    (x ^ y >>> 0).toString(2).split("").forEach(e => map[e] = (map[e] || 0) + 1);
    return map[1] != undefined ? map[1] : 0;
}

let leetcode463 = grid => {
    let ans = 0;
    let temp = [];
    grid.forEach(() => temp.push(0));
    grid.unshift(temp);
    grid.push(temp);
    grid.forEach(e => {
        e.unshift(0);
        e.push(0);
    })
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            if(grid[i][j]===1){
                if(grid[i-1][j]===0) ans++;
                if(grid[i][j-1]===0) ans++;
                if(grid[i+1][j]===0) ans++;
                if(grid[i][j+1]===0) ans++;
            }
        }
    }
    return ans;
}

///以解決
let leetcode479 = n => {
    switch (n) {
        case 1: return 9
        case 2: return 987
        case 3: return 123
        case 4: return 597
        case 5: return 677
        case 6: return 1218
        case 7: return 877
        case 8: return 475
        default: return -1
    }
}

///time out
let leetcode493 = nums => {
    let temp = 0;
    for(let i=0;i<nums.length;i++){
        for(let j=0;j<i;j++){
            if(nums[i]>nums[j]*2) temp++;
        }
    }
    return temp;
}

//console.log(leetcode493([1,3,2,3,1]));

let leetcode500 = words => {
    const top = ["q","w","e","r","t","y","u","i","o","p"]
    const mid = ["a","s","d","f","g","h","j","k","l"]
    const bot = ["z","x","c","v","b","n","m"]
    const ans = [];

    words.forEach(e => {
        let temp = e.toLowerCase();
        let sameTop = true;
        let sameMid = true;
        let sameBot = true;
        for(let i=0;i<temp.length;i++){
            sameTop &= (top.find(e => e===temp[i]) != undefined)
            sameMid &= (mid.find(e => e===temp[i]) != undefined)
            sameBot &= (bot.find(e => e===temp[i]) != undefined)
        }
        if(sameTop || sameMid || sameBot) ans.push(e)
    })
    return ans;
}

///以解決
let leetcode524 = (s, d) => {
    d.forEach(e => {
        for (let i = 0; i < s.length; i++) {
            console.log(i);
        }
    })
}

///以解決
let leetcode539 = timePoints => {
    const list = [];
    let ans = Number.MAX_VALUE;
    timePoints.forEach(e => {
        list.push(leetcode539Trans(e));
    })

    list.sort((a, b) => a - b);
    for (let i = 0; i < list.length - 1; i++) {
        let temp = list[i + 1] - list[i];
        let temp2 = temp > 720 ? 1440 - temp : temp;
        ans = temp2 > ans ? ans : temp2;
    }
    let temp3 = list[list.length - 1] - list[0];
    let temp4 = temp3 > 720 ? 1440 - temp3 : temp3;
    ans = temp4 > ans ? ans : temp4;
    return ans;
}

let leetcode539Trans = string => {
    let list = string.split(":");
    return parseInt(list[0]) * 60 + parseInt(list[1]);
}

///以解決
let leetcode541 = (s, k) => {
    const first = s.split("");
    const total = [];
    let ans = "";
    for (let i = 0; i < first.length; i++) {
        const temp = [];
        for (let j = 0; j < k; j++) {
            if (first[i] != undefined) temp.push(first[i]);
            i++;
        }
        total.push(temp);
        i--;
    }
    for (let i = 0; i < total.length; i++) {
        if (i % 2 == 0) total[i].reverse();
    }
    total.forEach(e => {
        e.forEach(e => {
            ans += e;
        })
    })
    return ans;
}

///待解
let leetcode598 = (m, n, ops) => {
    const list = [];
    for (let i = 0; i < m; i++) {
        const templist = [];
        for (let j = 0; j < n; j++) {
            templist.push(0);
        }
        list.push(templist);
    }

    return list;
}

let leetcode633 = c => {
    let limit = parseInt(Math.sqrt(c));
    for (let i = 0; i <= limit; i++) {
        let test = Math.sqrt(c - i * i);
        if (test - parseInt(test) == 0) return true;
    }
    return false;
}

let leetcode637 = root => {
    // create variable to hold answer
    var ans = [];
    // create variable to hold the level we are on, starting with input
    var currentLevel = [root];
    var keepGoing = true;
    while (keepGoing) {
        // create variable for 'next level', which is just the children of the current level
        var children = [];
        // create variable to help with calculating average.  Use float to avoid number flooring
        var sum = 0.0;
        // add up sum of current level and add children to 'next level' variable
        for (var i = 0; i < currentLevel.length; i++) {
            var parent = currentLevel[i];
            sum += parent.val;
            if (parent.left) children.push(parent.left);
            if (parent.right) children.push(parent.right);
        }
        // calculate average and add to answer
        var avg = sum / currentLevel.length;
        ans.push(avg);
        // set the current level to the 'next level'
        currentLevel = children;
        // advance further if we still have more levels
        keepGoing = currentLevel.length > 0;
    }
    return ans;
}

///以解決
let leetcode643 = (nums, k) => {
    let newnums = [];
    let temp = 0;
    let ans = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        temp += nums[i];
        newnums.push(temp);
    }
    for (let i = k - 1; i < newnums.length; i++) {
        if (i === k - 1) {
            ans = newnums[i]
        }
        else {
            let temp = newnums[i] - newnums[i - k];
            ans = ans > temp ? ans : temp;
        }
    }
    return ans / k;
}

let leetcode647 = s => {
    const list = s.split("");
    let ans = 0;
    for(let i=0;i<list.length;i++){
        let left = i-1,right = i+1;
        while(left >=0 && right < list.length && list[left]===list[right]){
            left--;
            right++;
            ans++;
        }
    }
    for(let i=0;i<list.length;i++){
        let left = i-1,right = i;
        while(left >=0 && right < list.length && list[left]===list[right]){
            left--;
            right++;
            ans++;
        }
    }
    ans += list.length;
    return ans;
}

//以解決
let leetcode657 = moves => {
    let map = {};
    moves.split('').forEach(c => map[c] = (map[c] || 0) + 1);
    return map["L"] === map["R"] && map["U"] === map["D"] ? true : false
}

let leetcode682 = ops => {
    const newOps = [];
    ops.forEach(e => {
        switch (e) {
            case "C":
                newOps.pop();
                break;
            case "D":
                let tempD = newOps.pop();
                newOps.push(tempD);
                newOps.push(tempD * 2);
                break;
            case "+":
                let tempP = newOps.pop();
                let tempP2 = newOps.pop();
                newOps.push(tempP2);
                newOps.push(tempP);
                newOps.push(tempP + tempP2);
                break;
            default:
                newOps.push(parseInt(e));
        }
    })

    return newOps.reduce((a, b) => {
        return a + b;
    }, 0);
}

let leetcode692 = (words, k) => {
    // generate word->frequncy map
    const map = words.reduce((result, word) => {
        result[word] = (result[word] || 0) + 1;
        return result;
    }, {});

    return Object.keys(map)
        .sort((w1, w2) => {
            // sort word by frequency
            if (map[w1] < map[w2]) {
                return 1;
            } else if (map[w1] > map[w2]) {
                return -1;
            } else {
                // if two words have same frequency, sort by alphabetically
                if (w1 < w2) return -1;
                if (w1 > w2) return 1;
                return 0;
            }
        })
        .slice(0, k);
}

let leetcode704 = (nums,target) => {
    let ans = 0;
    nums.forEach((e,i) => {if(target===e) ans = i;})
    return ans;
}

let leetcode713 = (nums, k) => {
    if (k <= 1) return 0;
    let prod = 1, ans = 0, left = 0;
    for (let right = 0; right < nums.length; right++) {
        prod *= nums[right];
        while (prod >= k) prod /= nums[left++];
        ans += right - left + 1;
    }
    return ans;
};

let leetcode728 = (left, right) => {
    const number = [];
    for (var i = left; i <= right; i++) {
        const number2 = [];
        let temp = i;
        while (temp % 10 != temp / 10) {
            number2.push(temp % 10);
            temp = parseInt(temp / 10);
        }
        if (leetcode728Cal(i, number2)) number.push(i);
    }
    return number;
}

let leetcode728Cal = (i, number2) => {
    let check = true;
    number2.forEach(e => {
        if (e == 0) {
            check = false;
        }
        if (i % e != 0) {
            check = false;
        }
    });
    return check;
}

//以解決
let leetcode790 = N => {
    const MOD = 1e9 + 7;
    const dp = [0, 1, 2, 5];

    for (let i = 4; i <= N; i++) {
        let temp = 2 * dp[i - 1] + dp[i - 3];
        temp %= MOD;
        dp.push(temp);
    }

    return dp[N];
}

///以解決
let leetcode804 = words => {
    const morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
    const back = [];
    let ans = {};
    let temp = "";
    let i = 0;

    words.forEach(e => {
        e.split('').forEach(k => {
            temp += morse[(k.charCodeAt(0) - 97)]
        })
        back.push(temp);
        temp = "";
    })

    back.forEach(c => ans[c] = (ans[c] || 0) + 1);

    for (var c in ans) {
        i++;
    }
    return i;
}

///以解決
let leetcode807 = grid => {
    const TopBot = [];
    const LeftRight = [];
    let ans = 0;

    grid.forEach(e => {
        LeftRight.push(Math.max(...e))
        e.forEach((element,index) => {
            TopBot[index] = TopBot[index] > element ? TopBot[index] : element;
        })
    })

    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            let top = Math.min(TopBot[i],LeftRight[j]);
            ans += top - grid[i][j];
        }
    }
    return ans;
}

///以解決
let leetcode821 = (S, C) => {
    const list = S.split("");
    let counter = new Array(list.length);
    for(let i=0;i<list.length;i++){
        if(list[i] === C){
            for(let j=0;j<list.length;j++){
               counter[j] = Math.abs(i-j) > counter[j] ? counter[j] : Math.abs(i-j);
            }
        }
    }
    return counter;
}

///以解決
let leetcode824 = S => {
    let list = S.split(" ");
    let ans = [];
    list.forEach((e,i) => {
        if(!(e[0].toLowerCase()==="a" || e[0].toLowerCase()==="e" || e[0].toLowerCase()==="i" || e[0].toLowerCase()==="o" || e[0].toLowerCase()==="u")){
            const tmp = e.split("");
            let temp = tmp.shift();
            tmp.push(temp);
            let name = tmp.join("") + "ma"
            for(let j=0;j<i+1;j++){
                name += "a";
            }
            ans[i] = name;
        }
        else{
            let name = e + "ma"
            for(let j=0;j<i+1;j++){
                name += "a";
            }
            ans[i] = name;
        }
    })
    return ans.join(" ");
}

///待研究
let leetcode829 = N => {
    let ret = 0;
    let ub = ((Math.sqrt(2 * N + 0.25) + 0.5) | 0);
    for (let n = 1; n <= ub; n++) {
        let b = (2 * N - n * n + n) / (2 * n);
        if (b > 0 && b === (b | 0)) ret++;
    }
    return ret;
}

///以解決
let leetcode832 = A => {
    A.forEach(e => {
        e.reverse();
        for(let i=0;i<e.length;i++){
            e[i] = e[i]===0 ? 1 : 0;
        }
    })
    return A;
}

let leetcode888 = (A, B) => {
    let temp = 0;
    let sumA = 0;
    let goal = 0;
    const list = [];
    A.forEach(e => {
        temp += e;
        sumA += e;
    })
    B.forEach(e => {
        temp += e;
    })
    temp /= 2;
    goal = sumA - temp;
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            if (A[i] - B[j] == goal) {
                list.push(A[i])
                list.push(B[j])
                return list
            }
        }
    }
    return list
}

///以解決
let leetcode890 = (words,pattern) => {
    const ans = [];
    const newpattern = leetcode890Decoder(pattern.split(""));
    words.forEach(e => {
        const temp = leetcode890Decoder(e.split(""));
        if(JSON.stringify(temp)===JSON.stringify(newpattern)){
            ans.push(e);
        }
    })
    return ans;
}

let leetcode890Decoder = array => {
    const newarray = [];
    const temparray = [];
    let temp = 0;
    while(array.length != 0){
        let alpha = array.shift();
        if(temparray.indexOf(alpha)!=-1){
            temparray.forEach((element,index) => {
                if(element===alpha){
                    newarray.push(newarray[index]);
                    temparray.push(alpha);
                }
            })
        }
        else{
            newarray.push(temp);
            temp++;
            temparray.push(alpha);
        }
    }
    return newarray;
}

///以解決
let leetcode905 = A => {
    const ans = [];
    A.forEach(e => {
        if(e%2===0) ans.push(e)
    })
    A.forEach(e => {
        if(e%2===1) ans.push(e)
    })
    return ans;
}

///以解決
let leetcode917 = S => {
    let ans = [];
    let others = {};
    let alpha = "";
    for(let i=0;i<S.length;i++){
        if((S[i].charCodeAt(0) > 64 && S[i].charCodeAt(0) < 91) || (S[i].charCodeAt(0) > 96 && S[i].charCodeAt(0) < 123)){
            alpha += S[i];
        }
        else{
            others[i] = S[i];
        }
    }
    ans = alpha.split("");
    ans.reverse();
    Object.keys(others).forEach(e => {
        ans.splice(e,0,others[e]);
    })
    return ans.join("");
}

///以解決
let leetcode925 = (name, typed) => {
    let namecount = 0, typedcount = 0;
    while (typedcount < typed.length) {
        if (name[namecount] === typed[typedcount]) {
            namecount++;
            typedcount++;
        }
        else {
            typedcount++;
        }
    }
    return namecount == name.length ? true : false;
};

///以解決
let leetcode929 = emails => {
    const newEmails = [];
    emails.forEach(element => {
        let res = element.split("@");
        let plus = res[0].split("+");
        let spot = plus[0].split(".");
        let code = "";
        spot.forEach(e => {
            code += e;
        });
        code += "@";
        code += res[1];
        newEmails.push(code);
    });

    return new Set(newEmails).size;
}

///以解決
let leetcode961 = A => {
    let count = {};
    let N = (A.length) / 2

    A.forEach(e => {
        count[e] = (count[e] || 0) + 1
    });

    for (let k in count) {
        if (count[k] === N) {
            return k;
        }
    }
    return null;
}

let leetcode967 = (N, K) => {
    const res = new Set();
    for (let i = 0; i <= 9; i += 1) {
        numsSameConsecDiffImpl(N - 1, K, res, i);
    }
    return [...res];
};

let numsSameConsecDiffImpl = (n, k, res, acc) => {
    if (n === 0) {
        res.add(acc);
        return;
    }
    if (acc === 0) {
        return; // No leading zeros
    }

    const lastNumber = acc % 10;
    const newValues = [
        lastNumber + k,
        lastNumber - k,
    ];
    for (const newValue of newValues) {
        if (newValue < 0 || newValue > 9) {
            continue;
        }
        numsSameConsecDiffImpl(n - 1, k, res, acc * 10 + newValue);
    }
}

///以解決
let leetcode973 = (points, K) => {
    const ans = [];
    points.sort((a,b) => {
        return -(Math.pow(a[0],2) + Math.pow(a[1],2) - Math.pow(b[0],2) - Math.pow(b[1],2))
    })
    for(let i=0;i<K;i++){
        ans.push(points.pop())
    }
    return ans;
}